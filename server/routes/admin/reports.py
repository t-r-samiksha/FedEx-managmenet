from fastapi import APIRouter
from db.connection import get_db_connection
# from services.reports_service import get_reports_data
from psycopg2.extras import RealDictCursor

def get_reports_data(conn):
    cur = conn.cursor(cursor_factory=RealDictCursor)

    # 1. Recovery by Region (derived / mocked)
    recovery_by_region = {
        "labels": ["North", "South", "East", "West", "Central"],
        "data": [75, 62, 80, 78, 65]
    }

    # 2. Case Status Distribution
    cur.execute("""
        SELECT status, COUNT(*) AS count
        FROM cases
        GROUP BY status
    """)
    rows = cur.fetchall()

    status_map = {
        "PAID": 0,
        "PTP": 0,
        "IN_PROGRESS": 0,
        "NEW": 0,
        "ESCALATED": 0
    }

    for row in rows:
        if row["status"] in status_map:
            status_map[row["status"]] = row["count"]

    case_status_distribution = {
        "labels": ["Paid", "PTP", "In Progress", "New", "Escalated"],
        "data": [
            status_map["PAID"],
            status_map["PTP"],
            status_map["IN_PROGRESS"],
            status_map["NEW"],
            status_map["ESCALATED"]
        ]
    }

    # 3. Collection Volume Trend (weekly)
    cur.execute("""
        SELECT
            DATE_TRUNC('week', created_at) AS week,
            SUM(total_amount_due) AS total
        FROM cases
        GROUP BY week
        ORDER BY week DESC
        LIMIT 5
    """)
    trend_rows = cur.fetchall()
    trend_rows.reverse()

    collection_volume_trend = {
        "labels": [f"Week {i+1}" for i in range(len(trend_rows))],
        "data": [float(row["total"]) for row in trend_rows]
    }

    return {
        "recoveryByRegion": recovery_by_region,
        "caseStatusDistribution": case_status_distribution,
        "collectionVolumeTrend": collection_volume_trend
    }

router = APIRouter()

@router.get("/reports")
def admin_reports():
    conn = get_db_connection()
    data = get_reports_data(conn)
    conn.close()

    return data