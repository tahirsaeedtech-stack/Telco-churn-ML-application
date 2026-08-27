# Telco Customer Churn Prediction

Short project description

Screenshot

## Overview

## Problem Statement

## Dataset

## Project Architecture

## Data Preprocessing

## Machine Learning Models

## Model Evaluation

## Final Model

## Application Features

## Technology Stack

## Project Structure

## Running Locally

## API

## Screenshots

## Results

## Limitations

## Future Improvements

## Author

# Telco Customer Churn Prediction

An end-to-end machine learning application for predicting
telecommunications customer churn.

The project covers the complete ML workflow, including exploratory
data analysis, preprocessing, model training, cross-validation,
model comparison, API development, and React frontend integration.

Three classification algorithms were evaluated:

- Logistic Regression
- Random Forest
- Gradient Boosting

The trained model is exposed through a FastAPI REST API and integrated
with a React/Vite frontend for interactive customer churn prediction.

User
 │
 ▼
React Frontend
 │
 │ JSON / HTTP
 ▼
FastAPI Backend
 │
 ▼
Scikit-learn Pipeline
 │
 ├── Missing-value handling
 ├── Scaling
 ├── One-hot encoding
 │
 ▼
ML Classifier
 │
 ▼
Churn probability

Machine Learning
- Python
- Pandas
- NumPy
- scikit-learn
- Joblib

Backend
- FastAPI
- Pydantic
- Uvicorn

Frontend
- React
- Vite
- Tailwind CSS
- Lucide React

Development
- Jupyter Notebook
- VS Code
- Git
- GitHub

## Backend
installation instructions
git clone <repository>
cd Telco-churn-ML-application

python -m venv .venv

## Windows
.venv\Scripts\activate

## Install
pip install -r requirements.txt

## Run
python -m uvicorn backend.main:app --reload

## Frontend
cd frontend
npm install
npm run dev

Frontend:
http://localhost:5173

Backend:
http://127.0.0.1:8000

Swagger:
http://127.0.0.1:8000/docs