from fastapi import APIRouter
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime

router = APIRouter()

DB_CONFIG = {
    "dbname": "fedex_dca",
    "user": "postgres",
    "password": "1234",
    "host": "localhost",
    "port": 5433
}

def get_db():
    return psycopg2.connect(**DB_CONFIG)


@router.get("/dca-performance")
def get_dca_performance():
    conn = get_db()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    cur.execute("""
        SELECT
            d.id AS dca_id,
            d.name AS dca_name,

            COUNT(ca.case_id) AS total_cases,

            COUNT(CASE WHEN c.status = 'Paid' THEN 1 END) AS paid_cases,

            COUNT(CASE WHEN se.breached_at IS NULL THEN 1 END) AS sla_ok,

            AVG(
                CASE
                    WHEN c.status = 'Paid'
                    THEN (c.updated_at::date - ca.assigned_at::date)
                END
            ) AS avg_days

        FROM dcas d
        LEFT JOIN case_assignments ca ON ca.dca_id = d.id
        LEFT JOIN cases c ON c.id = ca.case_id
        LEFT JOIN sla_events se ON se.case_id = c.id

        GROUP BY d.id, d.name
        ORDER BY d.name;
    """)

    rows = cur.fetchall()
    cur.close()
    conn.close()

    results = []

    for r in rows:
        total = r["total_cases"] or 0
        paid = r["paid_cases"] or 0
        sla_ok = r["sla_ok"] or 0

        recovery_rate = int((paid / total) * 100) if total else 0
        sla_percent = int((sla_ok / total) * 100) if total else 0

        performance_score = int((recovery_rate * 0.6) + (sla_percent * 0.4))

        if performance_score >= 85:
            tier = "Gold"
        elif performance_score >= 70:
            tier = "Silver"
        else:
            tier = "Bronze"

        results.append({
            "id": str(r["dca_id"]),
            "name": r["dca_name"],
            "performanceScore": performance_score,
            "recoveryRate": recovery_rate,
            "tier": tier,
            "avgTurnaround": f"{int(r['avg_days'] or 0)} Days",
            "slaCompliance": f"{sla_percent}%"
        })

    return results