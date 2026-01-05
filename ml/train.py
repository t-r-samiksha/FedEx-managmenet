import pandas as pd
import numpy as np
import joblib

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report, roc_auc_score

# -----------------------------
# 1. Load Dataset
# -----------------------------
data = pd.read_csv("dataset.csv")

# Drop case_id (not useful for ML)
X = data.drop(columns=["case_id", "recovered"])
y = data["recovered"]

# -----------------------------
# 2. Define Feature Types
# -----------------------------
numeric_features = [
    "amount_due",
    "days_overdue",
    "past_missed_payments",
    "partial_payments",
    "previous_dca_success_rate"
]

categorical_features = [
    "customer_type",
    "region"
]

# -----------------------------
# 3. Preprocessing
# -----------------------------
numeric_transformer = Pipeline(steps=[
    ("scaler", StandardScaler())
])

categorical_transformer = Pipeline(steps=[
    ("onehot", OneHotEncoder(handle_unknown="ignore"))
])

preprocessor = ColumnTransformer(
    transformers=[
        ("num", numeric_transformer, numeric_features),
        ("cat", categorical_transformer, categorical_features)
    ]
)

# -----------------------------
# 4. Model
# -----------------------------
model = LogisticRegression(
    max_iter=1000,
    class_weight="balanced"
)

# -----------------------------
# 5. Pipeline
# -----------------------------
pipeline = Pipeline(steps=[
    ("preprocessor", preprocessor),
    ("model", model)
])

# -----------------------------
# 6. Train / Test Split
# -----------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=42, stratify=y
)

# -----------------------------
# 7. Train Model
# -----------------------------
pipeline.fit(X_train, y_train)

# -----------------------------
# 8. Evaluation
# -----------------------------
y_pred = pipeline.predict(X_test)
y_prob = pipeline.predict_proba(X_test)[:, 1]

print("Accuracy:", accuracy_score(y_test, y_pred))
print("ROC-AUC:", roc_auc_score(y_test, y_prob))
print("\nClassification Report:\n", classification_report(y_test, y_pred))

# -----------------------------
# 9. Save Model
# -----------------------------
joblib.dump(pipeline, "model.pkl")
print("\nModel saved as model.pkl")
