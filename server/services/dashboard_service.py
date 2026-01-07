from psycopg2.extras import RealDictCursor
from datetime import datetime

def get_dashboard_data(db):
    cur = db.cursor(cursor_factory=RealDictCursor)

    # ---------- STATS ----------

    # Total Overdue Amount
    cur.execute("SELECT COALESCE(SUM(total_amount_due), 0) AS total FROM cases")
    total_overdue = cur.fetchone()["total"]

    # Active Cases
    cur.execute("SELECT COUNT(*) AS count FROM cases WHERE status = 'OPEN'")
    active_cases = cur.fetchone()["count"]

    # Closed Cases (for derived recovery rate)
    cur.execute("SELECT COUNT(*) AS count FROM cases WHERE status = 'CLOSED'")
    closed_cases = cur.fetchone()["count"]

    total_cases = active_cases + closed_cases
    avg_recovery_rate = (
        round((closed_cases / total_cases) * 100)
        if total_cases > 0 else 0
    )

    # SLA Breaches (past due date & not closed)
    cur.execute("""
        SELECT COUNT(*) AS count
        FROM cases
        WHERE due_date < NOW()
          AND status != 'CLOSED'
    """)
    sla_breaches = cur.fetchone()["count"]

    stats = [
        {
            "title": "Total Overdue",
            "value": f"${round(total_overdue / 1_000_000, 1)}M",
            "trend": "+12%",
            "trendUp": True,
            "type": "money"
        },
        {
            "title": "Active Cases",
            "value": f"{active_cases}",
            "trend": "-5%",
            "trendUp": False,
            "type": "users"
        },
        {
            "title": "Avg Recovery Rate",
            "value": f"{avg_recovery_rate}%",
            "trend": "+2.4%",
            "trendUp": True,
            "type": "percent"
        },
        {
            "title": "SLA Breaches",
            "value": str(sla_breaches),
            "trend": "+2",
            "trendUp": False,
            "type": "alert"
        }
    ]

    # ---------- CHARTS ----------

    # Recovery Trend (last 6 months based on closed cases)
    cur.execute("""
        SELECT to_char(created_at, 'Mon') AS month,
               COUNT(*) AS count
        FROM cases
        WHERE status = 'CLOSED'
        GROUP BY month
        ORDER BY MIN(created_at)
        LIMIT 6
    """)
    recovery_rows = cur.fetchall()

    recovery_trend = {
        "labels": [r["month"] for r in recovery_rows],
        "data": [r["count"] for r in recovery_rows]
    }

    # DCA Performance (mocked using customers count — placeholder)
    cur.execute("""
        SELECT customer_id, COUNT(*) AS count
        FROM cases
        GROUP BY customer_id
        LIMIT 4
    """)
    dca_rows = cur.fetchall()

    dca_performance = {
        "labels": [f"Customer {r['customer_id']}" for r in dca_rows],
        "data": [r["count"] for r in dca_rows]
    }

    # Overdue Aging (derived from due_date)
    cur.execute("SELECT due_date FROM cases WHERE status != 'CLOSED'")
    rows = cur.fetchall()

    aging = {"0-30 Days": 0, "31-60 Days": 0, "61-90 Days": 0, "90+ Days": 0}
    today = datetime.now().date()

    for r in rows:
        days_overdue = (today - r["due_date"]).days
        if days_overdue <= 30:
            aging["0-30 Days"] += 1
        elif days_overdue <= 60:
            aging["31-60 Days"] += 1
        elif days_overdue <= 90:
            aging["61-90 Days"] += 1
        else:
            aging["90+ Days"] += 1

    overdue_aging = {
        "labels": list(aging.keys()),
        "data": list(aging.values())
    }

    # ---------- ALERTS ----------
    cur.execute("""
        SELECT id, customer_id
        FROM cases
        WHERE due_date < NOW()
          AND status != 'CLOSED'
        ORDER BY due_date ASC
        LIMIT 5
    """)
    alert_rows = cur.fetchall()

    alerts = [
        {
            "id": r["id"],
            "title": f"SLA Breach Warning - Case #{r['id']}",
            "message": f"Case for Customer {r['customer_id']} is overdue.",
            "time": "Just now"
        }
        for r in alert_rows
    ]

    return {
        "stats": stats,
        "charts": {
            "recoveryTrend": recovery_trend,
            "dcaPerformance": dca_performance,
            "overdueAging": overdue_aging
        },
        "alerts": alerts
    }
