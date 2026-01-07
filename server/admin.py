from fastapi import APIRouter, Depends
from db import get_db
from services.dashboard_service import get_dashboard_data
from services.reports_service import get_reports_data

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.get("/dashboard")
def admin_dashboard(db = Depends(get_db)):
    return get_dashboard_data(db)

@router.get("/reports")
def reports(db=Depends(get_db)):
    return get_reports_data(db)