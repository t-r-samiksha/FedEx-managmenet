# from fastapi import FastAPI
# from routes.admin import admin_router

# app = FastAPI(title="FedEx DCA Management API")

# app.include_router(admin_router)

# @app.get("/")
# def health():
#     return {"status": "ok"}

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.admin import admin_router
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="FedEx DCA Management API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("CORS_ORIGINS", "*")],  # dev only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(admin_router)
