"""
escalation.py

Responsibility:
- Determine escalation risk and level
- Trigger early warnings before SLA breach
- Keep logic deterministic and explainable
"""

from datetime import datetime, timezone
from typing import Dict

# -----------------------------
# Escalation Configuration
# -----------------------------

ESCALATION_THRESHOLDS = {
    "HIGH_RISK_PROBABILITY": 0.30,   # ML-derived
    "CRITICAL_SLA_HOURS": 6,
    "WARNING_SLA_HOURS": 24
}

ESCALATION_LEVELS = {
    "NONE": "NONE",
    "WARNING": "WARNING",
    "CRITICAL": "CRITICAL"
}

# -----------------------------
# Core Escalation Evaluation
# -----------------------------

def evaluate_escalation(
    recovery_probability: float,
    sla_deadline: datetime,
    priority_level: str,
    current_time: datetime | None = None
) -> Dict[str, str | bool]:
    """
    Evaluate escalation requirement for a case.

    Parameters:
        recovery_probability (float): ML output
        sla_deadline (datetime): SLA deadline
        priority_level (str): Priority level from priority service
        current_time (datetime): Optional override for testing

    Returns:
        dict: escalation_required, escalation_level, reason
    """

    now = current_time or datetime.now(timezone.utc)
    hours_left = _hours_to_deadline(sla_deadline, now)

    # Rule 1: SLA already breached
    if hours_left <= 0:
        return _escalate(
            level=ESCALATION_LEVELS["CRITICAL"],
            reason="SLA breached"
        )

    # Rule 2: Very low recovery probability + near SLA
    if (
        recovery_probability < ESCALATION_THRESHOLDS["HIGH_RISK_PROBABILITY"]
        and hours_left <= ESCALATION_THRESHOLDS["WARNING_SLA_HOURS"]
    ):
        return _escalate(
            level=ESCALATION_LEVELS["CRITICAL"],
            reason="Low recovery probability with imminent SLA deadline"
        )

    # Rule 3: High priority case nearing SLA
    if (
        priority_level in ["CRITICAL", "HIGH"]
        and hours_left <= ESCALATION_THRESHOLDS["CRITICAL_SLA_HOURS"]
    ):
        return _escalate(
            level=ESCALATION_LEVELS["CRITICAL"],
            reason="High-priority case nearing SLA breach"
        )

    # Rule 4: Early warning
    if hours_left <= ESCALATION_THRESHOLDS["WARNING_SLA_HOURS"]:
        return _escalate(
            level=ESCALATION_LEVELS["WARNING"],
            reason="SLA deadline approaching"
        )

    # No escalation
    return {
        "escalation_required": False,
        "escalation_level": ESCALATION_LEVELS["NONE"],
        "reason": "No escalation required"
    }


# -----------------------------
# Helper Functions
# -----------------------------

def _hours_to_deadline(deadline: datetime, now: datetime) -> float:
    """
    Calculate hours remaining to SLA deadline
    """
    return (deadline - now).total_seconds() / 3600


def _escalate(level: str, reason: str) -> Dict[str, str | bool]:
    """
    Standard escalation response format
    """
    return {
        "escalation_required": True,
        "escalation_level": level,
        "reason": reason
    }
