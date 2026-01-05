"""
assignment.py

Responsibility:
- Decide whether a case can be auto-assigned or needs human approval
- Select the best-fit DCA using transparent scoring rules
"""

from typing import Dict, List

# -----------------------------
# Configuration (Tunable)
# -----------------------------

AUTO_ASSIGNMENT_THRESHOLD = 0.40  # recovery probability
MAX_DCA_WORKLOAD = 100            # soft cap for fair distribution

# -----------------------------
# Core Assignment Decision
# -----------------------------

def determine_assignment_mode(
    recovery_probability: float,
    escalation_required: bool
) -> Dict[str, str]:
    """
    Decide whether assignment is automatic or requires human approval.

    Returns:
        dict: assignment_mode, reason
    """

    if escalation_required:
        return {
            "assignment_mode": "MANUAL",
            "reason": "Escalation required"
        }

    if recovery_probability < AUTO_ASSIGNMENT_THRESHOLD:
        return {
            "assignment_mode": "MANUAL",
            "reason": "Low recovery probability"
        }

    return {
        "assignment_mode": "AUTO",
        "reason": "Eligible for auto-assignment"
    }


# -----------------------------
# DCA Selection Logic
# -----------------------------

def select_best_dca(
    dcas: List[Dict],
    case_context: Dict
) -> Dict:
    """
    Select the best-fit DCA based on performance, expertise, and workload.

    Parameters:
        dcas (list): List of DCA metadata
        case_context (dict): Case-level context (region, difficulty, etc.)

    Returns:
        dict: Selected DCA
    """

    scored_dcas = []

    for dca in dcas:
        score = _calculate_dca_score(dca, case_context)
        scored_dcas.append({
            "dca": dca,
            "score": score
        })

    # Sort by score (descending)
    scored_dcas.sort(key=lambda x: x["score"], reverse=True)

    return scored_dcas[0]["dca"] if scored_dcas else None


# -----------------------------
# Scoring Logic (Explainable)
# -----------------------------

def _calculate_dca_score(dca: Dict, case_context: Dict) -> float:
    """
    Calculate suitability score for a DCA.
    """

    performance_score = dca.get("historical_success_rate", 0.0) * 100
    workload_penalty = _workload_penalty(dca.get("current_workload", 0))
    region_bonus = _region_match_bonus(dca, case_context)

    final_score = performance_score + region_bonus - workload_penalty
    return round(final_score, 2)


def _workload_penalty(current_workload: int) -> float:
    """
    Penalize overloaded DCAs to ensure fair distribution.
    """
    if current_workload <= MAX_DCA_WORKLOAD:
        return 0
    return (current_workload - MAX_DCA_WORKLOAD) * 0.5


def _region_match_bonus(dca: Dict, case_context: Dict) -> float:
    """
    Reward DCAs experienced in the same region.
    """
    return 10 if dca.get("region") == case_context.get("region") else 0
