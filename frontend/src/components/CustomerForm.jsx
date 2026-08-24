import { useState } from "react";

const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://127.0.0.1:8000";


function CustomerForm() {
    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);
        setError("");

        try {
            const response = await fetch(
                `${API_URL}/predict`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(formData)
                }
            );

            if (!response.ok) {
                throw new Error("Prediction request failed");
            }

            const data = await response.json();

            setResult(data);
        } catch (error) {
            console.error(error);
            setError("Could not get prediction.");
        } finally {
            setLoading(false);
        }
    };
    const [formData, setFormData] = useState({
        gender: "Male",
        SeniorCitizen: 0,
        Partner: "No",
        Dependents: "No",
        tenure: 0,
        PhoneService: "Yes",
        MultipleLines: "No",
        InternetService: "DSL",
        OnlineSecurity: "No",
        OnlineBackup: "No",
        DeviceProtection: "No",
        TechSupport: "No",
        StreamingTV: "No",
        StreamingMovies: "No",
        Contract: "Month-to-month",
        PaperlessBilling: "Yes",
        PaymentMethod: "Electronic check",
        MonthlyCharges: 0,
        TotalCharges: 0
    });

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    return (
        <div>
            <h2>Customer Churn Prediction</h2>
        </div>
    );


}
<form onSubmit={handleSubmit}>

    {/* customer input fields go here */}

    <button
        type="submit"
        disabled={loading}
    >
        {loading ? "Predicting..." : "Predict Churn"}
    </button>

</form>

handleSubmit()


{
    result && (
        <div>
            <h2>Prediction Result</h2>

            <p>
                Prediction:
                {result.prediction === 1
                    ? " Customer may churn"
                    : " Customer likely to stay"}
            </p>

            <p>
                Churn Probability:
                {(result.churn_probability * 100).toFixed(2)}%
            </p>
        </div>
    )
}

{
    error && (
        <p>{error}</p>
    )
}

export default CustomerForm;