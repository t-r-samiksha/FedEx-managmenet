from fastapi import APIRouter

from .users import router as users_router
from .adashboard import router as dashboard_router
from .performance import router as performance_router
from .reports import router as reports_router
from .audit import router as audit_router

admin_router = APIRouter(prefix="/api/admin", tags=["Admin"])

admin_router.include_router(users_router)
admin_router.include_router(dashboard_router)
admin_router.include_router(performance_router)
admin_router.include_router(reports_router)
admin_router.include_router(audit_router)
