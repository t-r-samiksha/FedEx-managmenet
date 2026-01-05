"""
ml_service.py

Responsibility:
- Load trained ML model
- Provide prediction interface to backend services
- Keep ML isolated from business logic
"""

import os
import joblib
from typing import Dict, Any

# -----------------------------
# Model Loader (Singleton)
# -----------------------------

MODEL_PATH = os.getenv(
    "ML_MODEL_PATH",
    os.path.join(os.path.dirname(__file__), "..", "..", "ml", "model.pkl")
)

_model = None


def load_model():
    """
    Loads ML model only once (singleton pattern)
    """
    global _model

    if _model is None:
        if not os.path.exists(MODEL_PATH):
            raise FileNotFoundError(f"ML model not found at {MODEL_PATH}")

        _model = joblib.load(MODEL_PATH)

    return _model


# -----------------------------
# Prediction Interface
# -----------------------------

def predict_recovery(case_features: Dict[str, Any]) -> Dict[str, Any]:
    """
    Predict recovery probability and derive ML-based risk signals.

    Parameters:
        case_features (dict): Input features for ML model

    Returns:
        dict: ML prediction output
    """

    model = load_model()

    # Convert input to dataframe-like structure
    try:
        import pandas as pd
        input_df = pd.DataFrame([case_features])
    except Exception as e:
        raise ValueError(f"Invalid input format: {str(e)}")

    # ML Prediction
    try:
        recovery_probability = float(model.predict_proba(input_df)[0][1])
    except Exception as e:
        raise RuntimeError(f"ML prediction failed: {str(e)}")

    # Risk classification (ML-derived, rule-mapped)
    risk_level = _map_risk_level(recovery_probability)

    # Explainability signals (transparent & auditable)
    explanation_factors = _derive_explanations(case_features)

    return {
        "recovery_probability": round(recovery_probability, 4),
        "risk_level": risk_level,
        "explanations": explanation_factors
    }


# -----------------------------
# Helper Functions
# -----------------------------

def _map_risk_level(recovery_probability: float) -> str:
    """
    Map probability to risk bucket
    """
    if recovery_probability >= 0.7:
        return "LOW"
    elif recovery_probability >= 0.4:
        return "MEDIUM"
    return "HIGH"


def _derive_explanations(case_features: Dict[str, Any]) -> list:
    """
    Lightweight explainability logic (non-ML, enterprise-safe)
    """

    explanations = []

    if case_features.get("days_overdue", 0) > 60:
        explanations.append("High days overdue")

    if case_features.get("amount_due", 0) > 100000:
        explanations.append("Large outstanding amount")

    if case_features.get("past_missed_payments", 0) >= 3:
        explanations.append("Repeated missed payments")

    if case_features.get("previous_dca_success_rate", 1) < 0.5:
        explanations.append("Low historical DCA success rate")

    if not explanations:
        explanations.append("Standard risk profile")

    return explanations
