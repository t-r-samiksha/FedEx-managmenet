from psycopg2.extras import RealDictCursor
from datetime import datetime, date

def get_dashboard_data(db):
    cur = db.cursor(cursor_factory=RealDictCursor)

    # =======================
    # TOTAL OVERDUE AMOUNT
    # =======================
    cur.execute("""
        SELECT COALESCE(SUM(total_amount_due), 0) AS total
        FROM cases
        WHERE status != 'Paid'
    """)
    total_overdue = float(cur.fetchone()["total"])

    # =======================
    # ACTIVE CASES
    # =======================
    cur.execute("""
        SELECT COUNT(*) AS count
        FROM cases
        WHERE status IN ('New', 'Assigned', 'In Progress', 'PTP', 'Escalated')
    """)
    active_cases = cur.fetchone()["count"]

    # =======================
    # CLOSED / PAID CASES
    # =======================
    cur.execute("""
        SELECT COUNT(*) AS count
        FROM cases
        WHERE status = 'Paid'
    """)
    closed_cases = cur.fetchone()["count"]

    total_cases = active_cases + closed_cases
    avg_recovery_rate = round((closed_cases / total_cases) * 100, 1) if total_cases else 0

    # =======================
    # SLA BREACHES
    # =======================
    cur.execute("""
        SELECT COUNT(*) AS count
        FROM cases
        WHERE due_date < CURRENT_DATE
          AND status != 'Paid'
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
            "value": str(active_cases),
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

    # =======================
    # RECOVERY TREND (Paid cases)
    # =======================
    cur.execute("""
        SELECT
            TO_CHAR(created_at, 'Mon') AS month,
            COUNT(*) AS count
        FROM cases
        WHERE status = 'Paid'
        GROUP BY month
        ORDER BY MIN(created_at)
    """)
    recovery_rows = cur.fetchall()

    recovery_trend = {
        "labels": [r["month"] for r in recovery_rows],
        "data": [r["count"] for r in recovery_rows]
    }

    # =======================
    # DCA PERFORMANCE (Top customers)
    # =======================
    cur.execute("""
        SELECT customer_id, COUNT(*) AS count
        FROM cases
        GROUP BY customer_id
        ORDER BY count DESC
        LIMIT 4
    """)
    dca_rows = cur.fetchall()

    dca_performance = {
        "labels": [f"Customer {r['customer_id']}" for r in dca_rows],
        "data": [r["count"] for r in dca_rows]
    }

    # =======================
    # OVERDUE AGING
    # =======================
    cur.execute("""
        SELECT due_date
        FROM cases
        WHERE status != 'Paid'
    """)
    rows = cur.fetchall()

    aging = {"0-30 Days": 0, "31-60 Days": 0, "61-90 Days": 0, "90+ Days": 0}
    today = date.today()

    for r in rows:
        days = (today - r["due_date"]).days
        if days <= 30:
            aging["0-30 Days"] += 1
        elif days <= 60:
            aging["31-60 Days"] += 1
        elif days <= 90:
            aging["61-90 Days"] += 1
        else:
            aging["90+ Days"] += 1

    overdue_aging = {
        "labels": list(aging.keys()),
        "data": list(aging.values())
    }

    # =======================
    # ALERTS
    # =======================
    cur.execute("""
        SELECT id, customer_id
        FROM cases
        WHERE due_date < CURRENT_DATE
          AND status != 'Paid'
        ORDER BY due_date ASC
        LIMIT 5
    """)
    alert_rows = cur.fetchall()

    alerts = [
        {
            "id": str(r["id"]),
            "title": f"SLA Breach Warning - Case #{r['id']}",
            "message": f"Case for Customer {r['customer_id']} is overdue.",
            "time": "Just now"
        }
        for r in alert_rows
    ]

    cur.close()

    return {
        "stats": stats,
        "charts": {
            "recoveryTrend": recovery_trend,
            "dcaPerformance": dca_performance,
            "overdueAging": overdue_aging
        },
        "alerts": alerts
    }
