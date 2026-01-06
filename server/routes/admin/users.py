from fastapi import APIRouter
from datetime import datetime
from urllib.parse import quote_plus
import humanize

from db.connection import get_db_connection

router = APIRouter()

@router.get("/users")
def get_admin_users():
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT
            id,
            name,
            email,
            role,
            status,
            avatar_url,
            updated_at
        FROM users
        ORDER BY updated_at DESC
    """)

    rows = cur.fetchall()

    cur.close()
    conn.close()

    users = []
    # now = datetime.now(timezone.utc)
    now = datetime.utcnow()


    for row in rows:
        # derive lastActive
        last_active = humanize.naturaltime(now - row["updated_at"])

        # avatar fallback
        avatar = (
            row["avatar_url"]
            if row["avatar_url"]
            else f"https://ui-avatars.com/api/?name={quote_plus(row['name'])}&background=4D148C&color=fff"
        )

        users.append({
            "id": str(row["id"]),
            "name": row["name"],
            "email": row["email"],
            "avatar": avatar,
            "role": row["role"],
            "status": "Active" if row["status"] == "active" else "Inactive",
            "lastActive": last_active
        })

    return {
        "success": True,
        "count": len(users),
        "data": users
    }
