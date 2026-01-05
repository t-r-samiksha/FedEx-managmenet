"""
sla.py

Responsibility:
- SLA deadline calculation
- SLA status evaluation
- SLA breach detection
"""

from datetime import datetime, timedelta, timezone
from typing import Dict

# -----------------------------
# SLA CONFIGURATION (TUNABLE)
# -----------------------------

SLA_DEFINITIONS = {
    "LOW": timedelta(days=5),
    "MEDIUM": timedelta(days=3),
    "HIGH": timedelta(days=1),
    "CRITICAL": timedelta(hours=6)
}

SLA_STATUS = {
    "ON_TRACK": "ON_TRACK",
    "DUE_SOON": "DUE_SOON",
    "BREACHED": "BREACHED"
}

DUE_SOON_THRESHOLD_HOURS = 24


# -----------------------------
# SLA CREATION
# -----------------------------

def calculate_sla_deadline(
    assigned_at: datetime,
    priority_level: str
) -> datetime:
    """
    Calculate SLA deadline based on priority level.
    """

    if priority_level not in SLA_DEFINITIONS:
        raise ValueError(f"Invalid priority level: {priority_level}")

    return assigned_at + SLA_DEFINITIONS[priority_level]


# -----------------------------
# SLA STATUS EVALUATION
# -----------------------------

def evaluate_sla(
    sla_deadline: datetime,
    current_time: datetime | None = None
) -> Dict[str, str | float]:
    """
    Evaluate SLA status and time remaining.
    """

    now = current_time or datetime.now(timezone.utc)
    seconds_left = (sla_deadline - now).total_seconds()
    hours_left = round(seconds_left / 3600, 2)

    # SLA Breached
    if seconds_left <= 0:
        return {
            "sla_status": SLA_STATUS["BREACHED"],
            "hours_left": 0,
            "reason": "SLA deadline exceeded"
        }

    # SLA Due Soon
    if hours_left <= DUE_SOON_THRESHOLD_HOURS:
        return {
            "sla_status": SLA_STATUS["DUE_SOON"],
            "hours_left": hours_left,
            "reason": "SLA deadline approaching"
        }

    # SLA On Track
    return {
        "sla_status": SLA_STATUS["ON_TRACK"],
        "hours_left": hours_left,
        "reason": "SLA on track"
    }


# -----------------------------
# SLA BREACH CHECK
# -----------------------------

def is_sla_breached(sla_deadline: datetime) -> bool:
    """
    Simple boolean check for SLA breach.
    """
    return datetime.now(timezone.utc) > sla_deadline
