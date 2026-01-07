from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.admin.users import router as admin_users_router
from routes.admin.audit import router as admin_audit_router
from routes.admin.dashboard import router as admin_dashboard_router
from routes.admin.reports import router as admin_reports_router

app = FastAPI(title="FedEx DCA Backend")

# ✅ CORS (must be before routers)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Admin APIs
app.include_router(admin_users_router, prefix="/api/admin", tags=["Admin"])
app.include_router(admin_audit_router, prefix="/api/admin", tags=["Admin"])
app.include_router(admin_dashboard_router, prefix="/api/admin", tags=["Admin"])
app.include_router(admin_reports_router, prefix="/api/admin", tags=["Admin"])

@app.get("/")
def health():
    return {"status": "Backend running"}
