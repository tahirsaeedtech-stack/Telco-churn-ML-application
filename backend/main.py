from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import pandas as pd
import joblib

from backend.schemas import CustomerData


app = FastAPI(
    title="Telco Churn Prediction API"
)

model = joblib.load(
    "models/best_model.joblib"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/")
def root():
    return {
        "message": "Telco Churn API is running"
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
