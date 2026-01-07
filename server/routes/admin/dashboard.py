from fastapi import APIRouter
from db import get_db_connection
from services.dashboard_service import get_dashboard_data

router = APIRouter()

@router.get("/dashboard")
def admin_dashboard():
    conn = get_db_connection()
    data = get_dashboard_data(conn)
    conn.close()

    return data
