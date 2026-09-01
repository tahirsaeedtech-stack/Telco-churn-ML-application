from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import joblib
import pandas as pd

from backend.schemas import CustomerData


app = FastAPI(
    title="Telco Churn Prediction API",
    version="1.0.0"
)


model = joblib.load(
    "models/best_model.joblib"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/")
def root():
    return {
        "message": "Telco Churn Prediction API",
        "status": "running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "telco-churn-api"
    }


@app.post("/predict")
def predict(data: CustomerData):
    customer = pd.DataFrame([
        data.model_dump()
    ])

    prediction = model.predict(
        customer
    )[0]

    probability = model.predict_proba(
        customer
    )[0][1]

    return {
        "prediction": int(prediction),
        "churn_probability": float(probability)
    }
