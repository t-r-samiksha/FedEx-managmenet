from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from admin import router as admin_router

app = FastAPI(title="FedEx DCA Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(admin_router)
