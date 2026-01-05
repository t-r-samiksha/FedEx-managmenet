"""
dca_scoring.py

Responsibility:
- Fair DCA performance scoring
- Difficulty-weighted normalization using ML outputs
- SLA compliance penalty
"""

from typing import List, Dict

# -----------------------------
# Configuration (Tunable)
# -----------------------------

WEIGHTS = {
    "RECOVERY": 0.55,
    "DIFFICULTY": 0.25,
    "SLA": 0.20
}

MAX_SLA_PENALTY = 30  # Max points deducted


# -----------------------------
# Core DCA Performance Scoring
# -----------------------------

def calculate_dca_performance(
    cases: List[Dict]
) -> Dict[str, float]:
    """
    Calculate normalized performance score for a DCA.

    Each case dict must include:
    - recovered (bool)
    - recovery_probability (float)
    - sla_breached (bool)

    Returns:
        dict: performance_score, recovery_rate, sla_compliance
    """

    if not cases:
        return {
            "performance_score": 0.0,
            "recovery_rate": 0.0,
            "sla_compliance": 1.0
        }

    total_cases = len(cases)
    recovered_cases = sum(1 for c in cases if c["recovered"])
    sla_breaches = sum(1 for c in cases if c["sla_breached"])

    # -----------------------------
    # Raw Metrics
    # -----------------------------

    recovery_rate = recovered_cases / total_cases
    sla_compliance = 1 - (sla_breaches / total_cases)

    # -----------------------------
    # Difficulty-Weighted Recovery
    # -----------------------------

    difficulty_weighted_score = 0.0
    difficulty_total = 0.0

    for case in cases:
        difficulty = 1 - case["recovery_probability"]
        difficulty_total += difficulty

        if case["recovered"]:
            difficulty_weighted_score += difficulty

    normalized_difficulty_score = (
        difficulty_weighted_score / difficulty_total
        if difficulty_total > 0 else 0
    )

    # -----------------------------
    # SLA Penalty
    # -----------------------------

    sla_penalty = min(
        (1 - sla_compliance) * MAX_SLA_PENALTY,
        MAX_SLA_PENALTY
    )

    # -----------------------------
    # Final Performance Score
    # -----------------------------

    performance_score = (
        recovery_rate * WEIGHTS["RECOVERY"] * 100
        + normalized_difficulty_score * WEIGHTS["DIFFICULTY"] * 100
        + sla_compliance * WEIGHTS["SLA"] * 100
        - sla_penalty
    )

    return {
        "performance_score": round(performance_score, 2),
        "recovery_rate": round(recovery_rate, 2),
        "sla_compliance": round(sla_compliance, 2)
    }
