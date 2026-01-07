from fastapi import APIRouter
from db import get_db_connection

from datetime import datetime

router = APIRouter()

@router.get("/audit")
def get_audit_logs(limit: int = 50):
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT
            a.id,
            a.action_type,
            a.actor_role_snapshot,
            a.created_at,
            u.name AS user_name
        FROM audit_logs a
        LEFT JOIN users u ON u.id = a.actor_user_id
        ORDER BY a.created_at DESC
        LIMIT %s
    """, (limit,))

    rows = cur.fetchall()

    cur.close()
    conn.close()

    audit_logs = []

    for row in rows:
        audit_logs.append({
            "id": str(row["id"]),
            "action": row["action_type"],
            "user": row["user_name"] or "System",
            "role": row["actor_role_snapshot"],
            "timestamp": row["created_at"].isoformat()
        })

    return {
        "success": True,
        "count": len(audit_logs),
        "data": audit_logs
    }
