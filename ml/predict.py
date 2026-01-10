import joblib
import pandas as pd
import os
from dotenv import load_dotenv

load_dotenv()

# -----------------------------
# 1. Load Trained Model
# -----------------------------
model = joblib.load(os.getenv("MODEL_PATH", "model.pkl"))

# -----------------------------
# 2. Prediction Function
# -----------------------------
def predict_recovery(case_data: dict):
    """
    Input: dictionary with case features
    Output: recovery probability, risk level, and reasons
    """

    # Convert input dict to DataFrame
    df = pd.DataFrame([case_data])

    # Predict probability
    recovery_prob = model.predict_proba(df)[0][1]

    # Risk classification
    if recovery_prob >= 0.7:
        risk_level = "Low"
    elif recovery_prob >= 0.4:
        risk_level = "Medium"
    else:
        risk_level = "High"

    # Explainability (simple rule-based reasons)
    reasons = []

    if case_data["days_overdue"] > 60:
        reasons.append("High days overdue")

    if case_data["amount_due"] > 100000:
        reasons.append("Large overdue amount")

    if case_data["past_missed_payments"] >= 3:
        reasons.append("Poor payment history")

    if case_data["previous_dca_success_rate"] < 0.5:
        reasons.append("Low DCA historical success rate")

    if not reasons:
        reasons.append("Normal risk factors")

    return {
        "recovery_probability": round(recovery_prob, 2),
        "risk_level": risk_level,
        "reasons": reasons
    }


# -----------------------------
# 3. Example Run (for testing)
# -----------------------------
if __name__ == "__main__":
    sample_case = {
        "amount_due": 85000,
        "days_overdue": 65,
        "past_missed_payments": 4,
        "partial_payments": 1,
        "customer_type": "Business",
        "region": "South",
        "previous_dca_success_rate": 0.55
    }

    result = predict_recovery(sample_case)
    print(result)
