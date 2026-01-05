"""
priority.py

Responsibility:
- Calculate priority score for a case
- Convert score to human-readable priority level
- Keep logic transparent, explainable, and configurable
"""

from typing import Dict
from datetime import datetime, timezone

# -----------------------------
# Configuration (tunable)
# -----------------------------

PRIORITY_WEIGHTS = {
    "risk": 0.45,        # ML-driven risk importance
    "sla": 0.35,         # Time urgency
    "business": 0.20     # Monetary/business impact
}

PRIORITY_THRESHOLDS = {
    "CRITICAL": 80,
    "HIGH": 60,
    "MEDIUM": 40
}

MAX_AMOUNT_NORMALIZATION = 200_000  # ₹2L cap for scaling


# -----------------------------
# Core Priority Calculation
# -----------------------------

def calculate_priority(
    recovery_probability: float,
    sla_deadline: datetime,
    amount_due: float,
    current_time: datetime | None = None
) -> Dict[str, float | str]:
    """
    Calculate priority score and priority level.

    Parameters:
        recovery_probability (float): ML output (0–1)
        sla_deadline (datetime): SLA deadline timestamp
        amount_due (float): Outstanding amount
        current_time (datetime): Optional override for testing

    Returns:
        dict: priority_score, priority_level
    """

    now = current_time or datetime.now(timezone.utc)

    risk_score = _risk_component(recovery_probability)
    sla_score = _sla_component(sla_deadline, now)
    business_score = _business_component(amount_due)

    priority_score = (
        risk_score * PRIORITY_WEIGHTS["risk"]
        + sla_score * PRIORITY_WEIGHTS["sla"]
        + business_score * PRIORITY_WEIGHTS["business"]
    )

    priority_score = round(priority_score, 2)
    priority_level = _map_priority_level(priority_score)

    return {
        "priority_score": priority_score,
        "priority_level": priority_level
    }


# -----------------------------
# Priority Components
# -----------------------------

def _risk_component(recovery_probability: float) -> float:
    """
    Higher risk → higher priority
    """
    return (1 - recovery_probability) * 100


def _sla_component(sla_deadline: datetime, now: datetime) -> float:
    """
    Closer SLA → higher priority
    """
    seconds_left = (sla_deadline - now).total_seconds()

    if seconds_left <= 0:
        return 100  # SLA breached → max urgency

    hours_left = seconds_left / 3600

    if hours_left <= 6:
        return 90
    elif hours_left <= 24:
        return 75
    elif hours_left <= 72:
        return 50
    else:
        return 20


def _business_component(amount_due: float) -> float:
    """
    Normalize amount to a 0–100 scale
    """
    normalized = min(amount_due / MAX_AMOUNT_NORMALIZATION, 1)
    return normalized * 100


# -----------------------------
# Priority Mapping
# -----------------------------

def _map_priority_level(priority_score: float) -> str:
    """
    Convert numeric score to label
    """
    if priority_score >= PRIORITY_THRESHOLDS["CRITICAL"]:
        return "CRITICAL"
    elif priority_score >= PRIORITY_THRESHOLDS["HIGH"]:
        return "HIGH"
    elif priority_score >= PRIORITY_THRESHOLDS["MEDIUM"]:
        return "MEDIUM"
    return "LOW"
