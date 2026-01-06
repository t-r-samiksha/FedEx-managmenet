from sqlalchemy import (
    Column, String, Text, Date, DateTime, Boolean,
    Numeric, ForeignKey
)
from sqlalchemy.dialects.postgresql import UUID, JSONB
from database import Base
from datetime import datetime
import uuid

# =========================
# USERS
# =========================
class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True)
    email = Column(Text, unique=True, nullable=False)
    password_hash = Column(Text, nullable=False)
    name = Column(Text, nullable=False)
    role = Column(Text, nullable=False)
    avatar_url = Column(Text)
    status = Column(Text, default="active")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)


# =========================
# DCAS
# =========================
class DCA(Base):
    __tablename__ = "dcas"

    id = Column(UUID(as_uuid=True), primary_key=True)
    name = Column(Text, nullable=False)
    region = Column(Text)
    status = Column(Text, default="active")
    created_at = Column(DateTime, default=datetime.utcnow)


# =========================
# CUSTOMERS
# =========================
class Customer(Base):
    __tablename__ = "customers"

    id = Column(UUID(as_uuid=True), primary_key=True)
    name = Column(Text, nullable=False)
    type = Column(Text)
    region = Column(Text)
    email = Column(Text)
    phone = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)


# =========================
# CASES
# =========================
class Case(Base):
    __tablename__ = "cases"

    id = Column(UUID(as_uuid=True), primary_key=True)
    customer_id = Column(UUID(as_uuid=True), ForeignKey("customers.id"))
    total_amount_due = Column(Numeric(12, 2), nullable=False)
    due_date = Column(Date)
    status = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)


# =========================
# ML PREDICTIONS
# =========================
class MLPrediction(Base):
    __tablename__ = "ml_predictions"

    id = Column(UUID(as_uuid=True), primary_key=True)
    case_id = Column(UUID(as_uuid=True), ForeignKey("cases.id"))
    recovery_probability = Column(Numeric(5, 4))
    model_version = Column(Text)
    predicted_at = Column(DateTime, default=datetime.utcnow)
