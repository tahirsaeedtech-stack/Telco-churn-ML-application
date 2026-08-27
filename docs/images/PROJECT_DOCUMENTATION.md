# 📡 Telco Customer Churn Prediction

### An End-to-End Machine Learning Application for Predicting Customer Churn Using Scikit-learn, FastAPI, and React

---

## 📑 Table of Contents

- [1. Executive Overview](#1-executive-overview)
- [2. Problem Statement](#2-problem-statement)
- [3. Dataset Overview](#3-dataset-overview)
- [4. End-to-End System Architecture](#4-end-to-end-system-architecture)
  - [4.1 Application Workflow](#41-application-workflow)
  - [4.2 Repository Structure](#42-repository-structure)
- [5. Machine Learning Development Journey](#5-machine-learning-development-journey)
  - [Phase 1: Exploratory Data Analysis](#phase-1-exploratory-data-analysis)
  - [Phase 2: Data Cleaning](#phase-2-data-cleaning)
  - [Phase 3: Preprocessing Pipeline](#phase-3-preprocessing-pipeline)
  - [Phase 4: Logistic Regression](#phase-4-logistic-regression)
  - [Phase 5: Random Forest](#phase-5-random-forest)
  - [Phase 6: Gradient Boosting](#phase-6-gradient-boosting)
  - [Phase 7: Cross-Validation and Model Comparison](#phase-7-cross-validation-and-model-comparison)
- [6. Model Evaluation](#6-model-evaluation)
  - [6.1 Evaluation Metrics](#61-evaluation-metrics)
  - [6.2 Cross-Validation Results](#62-cross-validation-results)
  - [6.3 Model Selection Strategy](#63-model-selection-strategy)
- [7. Production Machine Learning Pipeline](#7-production-machine-learning-pipeline)
- [8. Backend Architecture — FastAPI](#8-backend-architecture--fastapi)
  - [8.1 API Endpoints](#81-api-endpoints)
  - [8.2 Request Schema](#82-request-schema)
  - [8.3 Prediction Flow](#83-prediction-flow)
- [9. Frontend Engineering — React](#9-frontend-engineering--react)
  - [9.1 User Interface](#91-user-interface)
  - [9.2 Frontend-to-Backend Communication](#92-frontend-to-backend-communication)
- [10. Technology Stack](#10-technology-stack)
- [11. Local Installation and Setup](#11-local-installation-and-setup)
  - [11.1 Clone the Repository](#111-clone-the-repository)
  - [11.2 Backend Setup](#112-backend-setup)
  - [11.3 Frontend Setup](#113-frontend-setup)
- [12. Screenshots](#12-screenshots)
- [13. Project Reproducibility](#13-project-reproducibility)
- [14. Responsible AI and Model Limitations](#14-responsible-ai-and-model-limitations)
- [15. Future Improvements](#15-future-improvements)
- [16. Key Learning Outcomes](#16-key-learning-outcomes)
- [17. Repository Status](#17-repository-status)
- [18. Author](#18-author)

---

# 1. Executive Overview

Customer churn is an important business problem for subscription-based companies. Retaining an existing customer is often more efficient than continually acquiring new customers, so identifying customers with a higher probability of leaving can support customer-retention strategies.

**Telco Customer Churn Prediction** is an end-to-end machine learning project developed to demonstrate the complete workflow of building a production-style classification application.

The project goes beyond training a single machine learning model. It includes:

- Exploratory data analysis
- Data cleaning
- Feature and target preparation
- Numerical and categorical preprocessing
- Scikit-learn pipelines
- Logistic Regression
- Random Forest
- Gradient Boosting
- Precision, Recall, F1-score, and confusion-matrix evaluation
- Stratified cross-validation
- Model comparison
- Model serialization using Joblib
- FastAPI REST API development
- Pydantic input validation
- React/Vite frontend development
- Frontend-to-backend communication
- Git and GitHub version control

Three classification algorithms were trained and evaluated under the same preprocessing and validation strategy:

1. **Logistic Regression**
2. **Random Forest**
3. **Gradient Boosting**

The application accepts telecom customer information through a React interface, sends that information to a FastAPI backend, processes it through the trained machine-learning pipeline, and returns both a churn prediction and churn probability.

> **Project objective:** demonstrate a complete machine-learning engineering workflow from raw CSV data to an interactive prediction application.

---

# 2. Problem Statement

The objective of this project is to predict whether a telecom customer is likely to discontinue the company's services.

The target variable is:

```text
Churn
```

with two possible outcomes:

```text
No  → Customer is expected to stay
Yes → Customer is expected to churn
```

For machine-learning training, the target was mapped to:

```text
No  → 0
Yes → 1
```

The application therefore solves a **binary classification problem**.

The practical question being answered is:

> Given a customer's demographic information, service subscriptions, contract information, tenure, and billing information, how likely is that customer to churn?

---

# 3. Dataset Overview

The project uses the **Telco Customer Churn dataset**, which contains information about telecommunications customers and whether they eventually churned.

The dataset contains approximately 7,000 customer records.

Important features include:

| Feature | Description |
|---|---|
| `gender` | Customer gender |
| `SeniorCitizen` | Whether the customer is a senior citizen |
| `Partner` | Whether the customer has a partner |
| `Dependents` | Whether the customer has dependents |
| `tenure` | Number of months the customer has stayed |
| `PhoneService` | Whether phone service is enabled |
| `MultipleLines` | Multiple phone-line subscription |
| `InternetService` | DSL, fiber optic, or no internet |
| `OnlineSecurity` | Online-security subscription |
| `OnlineBackup` | Online-backup subscription |
| `DeviceProtection` | Device-protection subscription |
| `TechSupport` | Technical-support subscription |
| `StreamingTV` | Streaming-TV subscription |
| `StreamingMovies` | Streaming-movie subscription |
| `Contract` | Month-to-month, one-year, or two-year contract |
| `PaperlessBilling` | Paperless-billing status |
| `PaymentMethod` | Customer payment method |
| `MonthlyCharges` | Monthly service charges |
| `TotalCharges` | Total amount charged |
| `Churn` | Prediction target |

The original `customerID` field was removed because it represents a unique identifier rather than a predictive customer characteristic.

---

# 4. End-to-End System Architecture

## 4.1 Application Workflow

The complete application follows this request flow:

```text
┌──────────────────────────────────────────────┐
│                USER / BROWSER                │
│                                              │
│ Customer enters account and service details │
└───────────────────────┬──────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────┐
│              REACT FRONTEND                  │
│                                              │
│ CustomerForm.jsx                             │
│                                              │
│ • Collect input                             │
│ • Validate required fields                  │
│ • Convert numerical values                  │
│ • Serialize data to JSON                    │
└───────────────────────┬──────────────────────┘
                        │
                        │ POST /predict
                        ▼
┌──────────────────────────────────────────────┐
│              FASTAPI BACKEND                 │
│                                              │
│ Pydantic schema validates request            │
│          │                                   │
│          ▼                                   │
│ Convert JSON → Pandas DataFrame              │
└───────────────────────┬──────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────┐
│          SCIKIT-LEARN PIPELINE               │
│                                              │
│ Numerical preprocessing                     │
│   • Missing-value imputation                 │
│   • StandardScaler                           │
│                                              │
│ Categorical preprocessing                   │
│   • Missing-value imputation                 │
│   • OneHotEncoder                            │
│                                              │
│               ↓                              │
│        Trained Classifier                    │
└───────────────────────┬──────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────┐
│             MODEL OUTPUT                     │
│                                              │
│ prediction: 0 / 1                            │
│ churn_probability: 0.00–1.00                 │
└───────────────────────┬──────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────┐
│              REACT RESULT UI                 │
│                                              │
│ • Churn risk                                │
│ • Probability percentage                    │
│ • Visual probability indicator              │
└──────────────────────────────────────────────┘
```

---

## 4.2 Repository Structure

```text
Telco-churn-ML-application/
│
├── backend/
│   ├── __init__.py
│   ├── main.py
│   └── schemas.py
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── CustomerForm.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── data/
│   └── raw/
│       └── WA_Fn-UseC_-Telco-Customer-Churn.csv
│
├── notebooks/
│   ├── 01_data_exploration.ipynb
│   ├── 02_logistic_regression.ipynb
│   ├── 03_random_forest.ipynb
│   ├── 04_gradient_boosting.ipynb
│   └── 05_model_comparison.ipynb
│
├── src/
│   ├── __init__.py
│   ├── preprocessing.py
│   ├── evaluate.py
│   └── predict.py
│
├── models/
│   ├── logistic_regression.joblib
│   ├── random_forest.joblib
│   ├── gradient_boosting.joblib
│   └── best_model.joblib
│
├── reports/
│   ├── model_results.csv
│   ├── cross_validation_results.csv
│   ├── roc_auc_results.csv
│   └── figures/
│
├── docs/
│   └── images/
│
├── .gitignore
├── requirements.txt
└── README.md
```

---

# 5. Machine Learning Development Journey

## Phase 1: Exploratory Data Analysis

The project began with exploratory data analysis in:

```text
notebooks/01_data_exploration.ipynb
```

The dataset was inspected using:

- `head()`
- `shape`
- `info()`
- `describe()`
- Missing-value analysis
- Class-distribution analysis
- Categorical-value inspection

The churn distribution was inspected to understand the balance between customers who stayed and customers who left.

EDA was also used to investigate relationships between churn and features such as:

- Contract type
- Monthly charges
- Tenure
- Internet service
- Technical support
- Billing behavior

The purpose of this phase was not model training, but understanding the structure and quality of the available data.

---

## Phase 2: Data Cleaning

One important issue was identified in:

```text
TotalCharges
```

Although conceptually numerical, the column contained blank string values and was therefore initially represented as an object/string column.

It was converted using:

```python
pd.to_numeric(df["TotalCharges"], errors="coerce")
```

Invalid entries became missing values and were handled during cleaning.

The unique identifier:

```text
customerID
```

was removed because it does not represent meaningful predictive information.

Reusable cleaning logic was moved from experimentation notebooks into:

```text
src/preprocessing.py
```

This prevents duplicated cleaning logic across individual model-training notebooks.

---

## Phase 3: Preprocessing Pipeline

The project contains both numerical and categorical features.

### Numerical features

Examples:

```text
SeniorCitizen
tenure
MonthlyCharges
TotalCharges
```

Numerical preprocessing includes:

```text
SimpleImputer(strategy="median")
          ↓
StandardScaler()
```

### Categorical features

Examples:

```text
gender
Partner
InternetService
Contract
PaymentMethod
...
```

Categorical preprocessing includes:

```text
SimpleImputer(strategy="most_frequent")
          ↓
OneHotEncoder(handle_unknown="ignore")
```

These transformations are combined using:

```text
ColumnTransformer
```

The resulting architecture is:

```text
Raw Input
   │
   ├──────────── Numerical Features
   │                    │
   │                    ▼
   │             Median Imputation
   │                    │
   │                    ▼
   │              StandardScaler
   │
   └──────────── Categorical Features
                        │
                        ▼
               Most-Frequent Imputation
                        │
                        ▼
                 OneHotEncoder
                        │
             ┌──────────┘
             ▼
      Transformed Features
             │
             ▼
         Classifier
```

The preprocessing transformer and classifier are combined into a single Scikit-learn `Pipeline`.

This is important because preprocessing during production inference must remain identical to preprocessing during model training.

---

## Phase 4: Logistic Regression

The first baseline model was Logistic Regression.

Logistic Regression was selected as the initial model because it provides:

- A strong classification baseline
- Relatively simple behavior
- Fast training and inference
- Good compatibility with scaled numerical features and one-hot encoded categorical features

The complete model pipeline contained:

```text
ColumnTransformer
       ↓
LogisticRegression
```

Model evaluation included:

- Accuracy
- Precision
- Recall
- F1-score
- Classification report
- Confusion matrix
- Prediction probabilities

---

## Phase 5: Random Forest

The second algorithm evaluated was:

```text
RandomForestClassifier
```

Random Forest provides a non-linear ensemble-based comparison against Logistic Regression.

The same:

- dataset
- preprocessing logic
- target mapping
- train/test strategy
- evaluation metrics

were maintained to ensure fair comparison.

The purpose was to test whether an ensemble of decision trees could capture patterns that a linear classifier might miss.

---

## Phase 6: Gradient Boosting

The third algorithm evaluated was:

```text
GradientBoostingClassifier
```

Gradient Boosting sequentially combines weak decision trees, where later estimators focus on correcting errors made by earlier estimators.

Again, the same preprocessing and evaluation strategy was preserved.

The three baseline algorithms therefore represented different modeling families:

| Algorithm | Model Family |
|---|---|
| Logistic Regression | Linear probabilistic classifier |
| Random Forest | Bagging / tree ensemble |
| Gradient Boosting | Sequential boosting ensemble |

---

## Phase 7: Cross-Validation and Model Comparison

A single train/test split can sometimes produce an optimistic or pessimistic estimate depending on which records happen to appear in the test set.

Therefore, the models were evaluated using:

```text
Stratified 5-Fold Cross-Validation
```

with:

```text
scoring = "f1"
```

Stratification preserved approximately the same churn/non-churn ratio across folds.

The use of F1-score was particularly important because churn prediction contains a class imbalance and therefore accuracy alone can be misleading.

---

# 6. Model Evaluation

## 6.1 Evaluation Metrics

The following metrics were considered.

### Accuracy

Percentage of total predictions that were correct.

```text
Correct Predictions
────────────────────────
Total Predictions
```

Accuracy is useful but should not be used alone for an imbalanced classification task.

### Precision

Among customers predicted to churn:

> How many actually churned?

High precision reduces false-positive churn alerts.

### Recall

Among customers who actually churned:

> How many were successfully detected?

Recall is particularly relevant when the cost of failing to identify a churner is high.

### F1-Score

F1-score balances precision and recall.

It was used as the primary cross-validation scoring metric.

### ROC-AUC

ROC-AUC evaluates how effectively the classifier separates churners from non-churners across classification thresholds.

---

## 6.2 Cross-Validation Results

The three baseline models produced the following 5-fold cross-validation results:

| Model | Mean CV F1 | CV Standard Deviation |
|---|---:|---:|
| **Logistic Regression** | **0.5987** | 0.0099 |
| Gradient Boosting | 0.5863 | **0.0096** |
| Random Forest | 0.5482 | 0.0165 |

### Interpretation

**Logistic Regression** produced the strongest average cross-validation F1-score.

**Gradient Boosting** performed competitively and showed slightly lower fold-to-fold variation.

**Random Forest** produced the lowest mean F1-score and the highest standard deviation among the three baseline models.

The results demonstrate an important machine-learning lesson:

> A more complex algorithm does not automatically outperform a simpler model.

---

## 6.3 Model Selection Strategy

Final model selection should not rely on one metric alone.

The following factors were considered:

```text
Cross-validation F1
        +
Precision
        +
Recall
        +
ROC-AUC
        +
Stability across folds
        +
Model complexity
        +
Inference efficiency
```

The selected production model is serialized as:

```text
models/best_model.joblib
```

> Update this section with the exact final model name after completing final tuning and threshold analysis.

---

# 7. Production Machine Learning Pipeline

The application does not serialize only a classifier.

Instead, the complete Scikit-learn pipeline is stored.

```text
Raw Customer Data
        │
        ▼
ColumnTransformer
        │
        ├── Numeric Pipeline
        │      ├── Imputer
        │      └── Scaler
        │
        └── Categorical Pipeline
               ├── Imputer
               └── OneHotEncoder
        │
        ▼
Classifier
        │
        ▼
Prediction
```

This design ensures that a new customer's raw input is processed using exactly the same transformations that were used during training.

The final pipeline is serialized using:

```python
joblib.dump(...)
```

and loaded by FastAPI during application startup.

---

# 8. Backend Architecture — FastAPI

The backend is implemented using:

```text
FastAPI
Pydantic
Pandas
Joblib
Scikit-learn
```

The main backend files are:

```text
backend/
├── main.py
└── schemas.py
```

---

## 8.1 API Endpoints

### `GET /`

Health/basic API information.

Example response:

```json
{
  "message": "Telco Churn Prediction API",
  "status": "running"
}
```

### `GET /health`

Used to verify that the backend service is operational.

Example:

```json
{
  "status": "healthy"
}
```

### `POST /predict`

Receives customer information and returns the churn prediction.

Example response:

```json
{
  "prediction": 1,
  "churn_probability": 0.7421
}
```

where:

```text
prediction = 0 → likely to stay
prediction = 1 → likely to churn
```

---

## 8.2 Request Schema

FastAPI uses Pydantic to validate incoming JSON.

A prediction request contains:

```json
{
  "gender": "Male",
  "SeniorCitizen": 0,
  "Partner": "Yes",
  "Dependents": "No",
  "tenure": 12,
  "PhoneService": "Yes",
  "MultipleLines": "No",
  "InternetService": "Fiber optic",
  "OnlineSecurity": "No",
  "OnlineBackup": "Yes",
  "DeviceProtection": "No",
  "TechSupport": "No",
  "StreamingTV": "Yes",
  "StreamingMovies": "Yes",
  "Contract": "Month-to-month",
  "PaperlessBilling": "Yes",
  "PaymentMethod": "Electronic check",
  "MonthlyCharges": 89.5,
  "TotalCharges": 1074.0
}
```

Backend validation ensures that required fields are present and that numeric values have appropriate types before prediction.

---

## 8.3 Prediction Flow

```text
POST /predict
      │
      ▼
Pydantic Validation
      │
      ▼
Validated CustomerData
      │
      ▼
Pandas DataFrame
      │
      ▼
best_model.joblib
      │
      ├── preprocessing
      │
      └── classifier
      │
      ▼
predict()
predict_proba()
      │
      ▼
JSON Response
```

---

# 9. Frontend Engineering — React

The user interface is developed using:

```text
React
Vite
Tailwind CSS
Lucide React
```

The frontend provides an interactive dashboard for entering customer information and viewing churn predictions.

---

## 9.1 User Interface

Customer input is divided into logical sections.

### Customer Details

- Gender
- Senior citizen
- Partner
- Dependents
- Tenure

### Phone Services

- Phone service
- Multiple lines

### Internet Services

- Internet service
- Online security
- Online backup
- Device protection
- Tech support
- Streaming TV
- Streaming movies

### Contract & Billing

- Contract
- Paperless billing
- Payment method
- Monthly charges
- Total charges

The application displays:

```text
Predicted customer status
Churn probability
Visual risk/probability indicator
Loading state
API-error state
```

The interface is responsive and structured as a modern ML analytics dashboard rather than a basic HTML form.

---

## 9.2 Frontend-to-Backend Communication

The React frontend communicates with FastAPI using the Fetch API.

Conceptually:

```javascript
fetch(`${API_URL}/predict`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(formData)
})
```

The API URL is configured through:

```text
VITE_API_URL
```

during frontend deployment.

This keeps development and production API addresses separate.

---

# 10. Technology Stack

## Machine Learning

- Python
- Pandas
- NumPy
- Scikit-learn
- Joblib

## Models

- Logistic Regression
- Random Forest
- Gradient Boosting

## Model Engineering

- Pipeline
- ColumnTransformer
- SimpleImputer
- StandardScaler
- OneHotEncoder
- StratifiedKFold
- Cross-validation

## Backend

- FastAPI
- Pydantic
- Uvicorn
- Pandas

## Frontend

- React
- Vite
- Tailwind CSS
- Lucide React

## Development Tools

- Jupyter Notebook
- Visual Studio Code
- Git
- GitHub

---

# 11. Local Installation and Setup

## 11.1 Clone the Repository

```bash
git clone https://github.com/tahirsaeedtech-stack/Telco-churn-ML-application.git
```

Then:

```bash
cd Telco-churn-ML-application
```

---

## 11.2 Backend Setup

Create a virtual environment:

```bash
python -m venv .venv
```

### Windows PowerShell

```powershell
.\.venv\Scripts\Activate.ps1
```

If PowerShell execution restrictions prevent activation, use Command Prompt or configure the appropriate local execution policy.

Install dependencies:

```bash
pip install -r requirements.txt
```

Start FastAPI:

```bash
python -m uvicorn backend.main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

Swagger documentation:

```text
http://127.0.0.1:8000/docs
```

Health endpoint:

```text
http://127.0.0.1:8000/health
```

---

## 11.3 Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install Node dependencies:

```bash
npm install
```

On Windows PowerShell, if `npm.ps1` is blocked:

```bash
npm.cmd install
```

Start Vite:

```bash
npm run dev
```

or:

```bash
npm.cmd run dev
```

The frontend will normally run at:

```text
http://localhost:5173
```

For local development, create:

```text
frontend/.env
```

with:

```text
VITE_API_URL=http://127.0.0.1:8000
```

Do not commit `.env` files containing environment-specific configuration or secrets.

---

# 12. Screenshots

Create screenshots inside:

```text
docs/images/
```

Recommended screenshots:

```text
docs/images/dashboard.png
docs/images/prediction-result.png
docs/images/model-comparison.png
docs/images/api-docs.png
```

Then display them here.

## Application Dashboard

```markdown
![Telco Churn Dashboard](docs/images/dashboard.png)
```

## Prediction Result

```markdown
![Prediction Result](docs/images/prediction-result.png)
```

## Model Comparison

```markdown
![Model Comparison](docs/images/model-comparison.png)
```

---

# 13. Project Reproducibility

The project has been structured so that another developer can reproduce the application without relying on the original Jupyter runtime.

Reusable logic is separated into:

```text
src/preprocessing.py
src/evaluate.py
src/predict.py
```

Machine-learning models are stored as serialized pipelines:

```text
models/*.joblib
```

Python dependencies are defined in:

```text
requirements.txt
```

Frontend dependencies are defined in:

```text
frontend/package.json
frontend/package-lock.json
```

A successful reproducibility test should follow:

```text
Clone repository
       ↓
Create clean Python environment
       ↓
pip install -r requirements.txt
       ↓
Start FastAPI
       ↓
npm install
       ↓
Start React
       ↓
Submit customer
       ↓
Receive prediction
```

---

# 14. Responsible AI and Model Limitations

This application is a **machine-learning demonstration and decision-support project**, not an autonomous customer-management system.

Predictions should not be interpreted as guaranteed customer outcomes.

Important limitations include:

- The dataset contains a limited historical sample of telecom customers.
- Customer behavior may differ across companies, regions, and time periods.
- Model accuracy can decline when incoming data differs from the training distribution.
- A churn probability represents model-estimated risk, not certainty.
- The application does not currently monitor model drift.
- The application does not automatically retrain the model.
- The current model does not incorporate real-time customer activity.
- Incorrect or incomplete customer information may reduce prediction quality.

A real telecommunications organization should evaluate:

- fairness,
- customer-impact risks,
- calibration,
- model drift,
- monitoring,
- business costs of false positives,
- business costs of false negatives

before using such a system for operational decisions.

---

# 15. Future Improvements

Potential future improvements include:

### Machine Learning

- More extensive hyperparameter optimization
- Threshold optimization based on business cost
- Probability calibration
- SHAP-based explainability
- Feature-importance visualization
- Additional classifiers such as XGBoost or LightGBM
- Automated experiment tracking

### Backend

- Structured logging
- Automated API tests
- Authentication
- Rate limiting
- Production-grade configuration management

### Frontend

- Model-comparison dashboard
- Interactive probability visualizations
- Prediction history
- Better mobile responsiveness
- Dark/light theme
- Detailed risk explanations

### MLOps

- Docker
- CI/CD
- MLflow
- Model registry
- Data-drift detection
- Performance monitoring
- Automatic retraining workflow
- Cloud model storage

### Infrastructure

Future production versions could be deployed using:

- AWS
- Google Cloud
- Microsoft Azure
- Railway
- Render
- Vercel

These technologies are intentionally not required for the first project version so that the repository remains focused on a clear and reproducible end-to-end ML workflow.

---

# 16. Key Learning Outcomes

This project demonstrates practical understanding of:

### Data Science

- Dataset exploration
- Data-quality inspection
- Missing-value handling
- Categorical-feature analysis
- Feature/target separation

### Machine Learning

- Binary classification
- Logistic Regression
- Random Forest
- Gradient Boosting
- Train/test splitting
- Stratification
- Cross-validation
- Model comparison
- Precision
- Recall
- F1-score
- ROC-AUC
- Probability prediction

### ML Engineering

- Reusable preprocessing
- Scikit-learn pipelines
- ColumnTransformer
- Model serialization
- Separation of experimentation and production code

### Backend Engineering

- REST APIs
- FastAPI
- JSON request/response design
- Pydantic validation
- CORS configuration

### Frontend Engineering

- React components
- React state management
- Form handling
- API communication
- Loading and error states
- Responsive UI design

### Software Engineering

- Modular project structure
- Git
- GitHub
- Dependency management
- Environment variables
- Reproducibility

---

# 17. Repository Status

Current project status:

| Component | Status |
|---|---|
| Data Exploration | ✅ Complete |
| Data Cleaning | ✅ Complete |
| Preprocessing Pipeline | ✅ Complete |
| Logistic Regression | ✅ Complete |
| Random Forest | ✅ Complete |
| Gradient Boosting | ✅ Complete |
| Cross-Validation | ✅ Complete |
| FastAPI Backend | ✅ Complete |
| React Frontend | ✅ Complete |
| Local End-to-End Integration | ✅ Complete |
| GitHub Repository | ✅ Complete |
| Screenshots | 🔄 To finalize |
| Production Deployment | ⏳ Planned |
| Docker / MLOps | ⏳ Future work |

---

# 18. Author

Developed as an end-to-end machine-learning engineering portfolio project.

### GitHub

[github.com/tahirsaeedtech-stack](https://github.com/tahirsaeedtech-stack)

### Project Repository

[Telco Churn ML Application](https://github.com/tahirsaeedtech-stack/Telco-churn-ML-application)

---

## ⭐ Project Summary

This project demonstrates the complete transition from:

```text
Raw Dataset
    ↓
Data Exploration
    ↓
Cleaning
    ↓
Preprocessing
    ↓
Three ML Algorithms
    ↓
Model Evaluation
    ↓
Cross-Validation
    ↓
Model Selection
    ↓
Serialized ML Pipeline
    ↓
FastAPI REST API
    ↓
React Frontend
    ↓
Interactive Churn Prediction Application
```

The primary purpose of the project is not simply to achieve a classification score, but to demonstrate how a machine-learning experiment can be transformed into a structured, reproducible, and user-facing software application.