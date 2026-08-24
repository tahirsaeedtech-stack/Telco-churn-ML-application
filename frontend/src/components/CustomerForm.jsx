import { useState } from "react";

import {
    UserRound,
    Wifi,
    CreditCard,
    ShieldCheck,
    BrainCircuit,
    Activity
} from "lucide-react";

const API_URL =
    import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

function CustomerForm() {
    // ---------------------------------------------------------
    // 1. FORM DATA
    // ---------------------------------------------------------

    const [formData, setFormData] = useState({
        gender: "Male",
        SeniorCitizen: 0,
        Partner: "No",
        Dependents: "No",
        tenure: 1,
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
        MonthlyCharges: 50,
        TotalCharges: 50,
    });

    // ---------------------------------------------------------
    // 2. RESULT / LOADING / ERROR STATES
    // ---------------------------------------------------------

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // ---------------------------------------------------------
    // 3. NUMERIC FIELDS
    // ---------------------------------------------------------

    const numericFields = [
        "SeniorCitizen",
        "tenure",
        "MonthlyCharges",
        "TotalCharges",
    ];

    // ---------------------------------------------------------
    // 4. HANDLE INPUT CHANGES
    // ---------------------------------------------------------

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,

            [name]: numericFields.includes(name)
                ? Number(value)
                : value,
        }));
    };

    // ---------------------------------------------------------
    // 5. SEND DATA TO FASTAPI
    // ---------------------------------------------------------

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);
        setError("");
        setResult(null);

        console.log("Data being sent to FastAPI:");
        console.log(formData);

        try {
            const response = await fetch(`${API_URL}/predict`, {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorText = await response.text();

                console.error("FastAPI error:", errorText);

                throw new Error(
                    `Prediction failed with status ${response.status}`
                );
            }

            const data = await response.json();

            console.log("FastAPI response:");
            console.log(data);

            setResult(data);
        } catch (err) {
            console.error("Prediction error:", err);

            setError(
                "Could not get a prediction. Please make sure the FastAPI server is running."
            );
        } finally {
            setLoading(false);
        }
    };

    // ---------------------------------------------------------
    // 6. USER INTERFACE
    // ---------------------------------------------------------

    return (
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">

            {/* LEFT SIDE — FORM */}
            <div className="space-y-6">

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    {/* CUSTOMER DETAILS */}
                    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">

                        <div className="mb-6 flex items-center gap-3">
                            <UserRound className="h-5 w-5 text-indigo-400" />

                            <div>
                                <h3 className="text-lg font-semibold">
                                    Customer Details
                                </h3>

                                <p className="text-sm text-slate-400">
                                    Basic customer information
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">

                            <div>
                                <label className="text-sm font-medium text-slate-300">
                                    Gender
                                </label>

                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>


                            <div>
                                <label className="text-sm font-medium text-slate-300">
                                    Senior Citizen
                                </label>

                                <select
                                    name="SeniorCitizen"
                                    value={formData.SeniorCitizen}
                                    onChange={handleChange}
                                    className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                                >
                                    <option value={0}>No</option>
                                    <option value={1}>Yes</option>
                                </select>
                            </div>


                            <div>
                                <label className="text-sm font-medium text-slate-300">
                                    Partner
                                </label>

                                <select
                                    name="Partner"
                                    value={formData.Partner}
                                    onChange={handleChange}
                                    className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                                >
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                </select>
                            </div>


                            <div>
                                <label className="text-sm font-medium text-slate-300">
                                    Dependents
                                </label>

                                <select
                                    name="Dependents"
                                    value={formData.Dependents}
                                    onChange={handleChange}
                                    className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                                >
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                </select>
                            </div>


                            <div>
                                <label className="text-sm font-medium text-slate-300">
                                    Tenure
                                </label>

                                <input
                                    type="number"
                                    name="tenure"
                                    value={formData.tenure}
                                    onChange={handleChange}
                                    min="0"
                                    className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                                />
                            </div>

                        </div>
                    </section>


                    {/* PHONE SERVICES */}
                    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">

                        <div className="mb-6 flex items-center gap-3">
                            <ShieldCheck className="h-5 w-5 text-indigo-400" />

                            <div>
                                <h3 className="text-lg font-semibold">
                                    Phone Services
                                </h3>

                                <p className="text-sm text-slate-400">
                                    Phone subscription details
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">

                            <div>
                                <label className="text-sm font-medium text-slate-300">
                                    Phone Service
                                </label>

                                <select
                                    name="PhoneService"
                                    value={formData.PhoneService}
                                    onChange={handleChange}
                                    className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100"
                                >
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>


                            <div>
                                <label className="text-sm font-medium text-slate-300">
                                    Multiple Lines
                                </label>

                                <select
                                    name="MultipleLines"
                                    value={formData.MultipleLines}
                                    onChange={handleChange}
                                    className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100"
                                >
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No phone service">
                                        No phone service
                                    </option>
                                </select>
                            </div>

                        </div>
                    </section>


                    {/* INTERNET SERVICES */}
                    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">

                        <div className="mb-6 flex items-center gap-3">
                            <Wifi className="h-5 w-5 text-indigo-400" />

                            <div>
                                <h3 className="text-lg font-semibold">
                                    Internet Services
                                </h3>

                                <p className="text-sm text-slate-400">
                                    Internet and support features
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">

                            <div>
                                <label className="text-sm font-medium text-slate-300">
                                    Internet Service
                                </label>

                                <select
                                    name="InternetService"
                                    value={formData.InternetService}
                                    onChange={handleChange}
                                    className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100"
                                >
                                    <option value="DSL">DSL</option>
                                    <option value="Fiber optic">Fiber optic</option>
                                    <option value="No">No</option>
                                </select>
                            </div>


                            {[
                                ["OnlineSecurity", "Online Security"],
                                ["OnlineBackup", "Online Backup"],
                                ["DeviceProtection", "Device Protection"],
                                ["TechSupport", "Tech Support"],
                                ["StreamingTV", "Streaming TV"],
                                ["StreamingMovies", "Streaming Movies"],
                            ].map(([name, label]) => (
                                <div key={name}>
                                    <label className="text-sm font-medium text-slate-300">
                                        {label}
                                    </label>

                                    <select
                                        name={name}
                                        value={formData[name]}
                                        onChange={handleChange}
                                        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100"
                                    >
                                        <option value="No">No</option>
                                        <option value="Yes">Yes</option>

                                        <option value="No internet service">
                                            No internet service
                                        </option>
                                    </select>
                                </div>
                            ))}

                        </div>
                    </section>


                    {/* CONTRACT & BILLING */}
                    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">

                        <div className="mb-6 flex items-center gap-3">
                            <CreditCard className="h-5 w-5 text-indigo-400" />

                            <div>
                                <h3 className="text-lg font-semibold">
                                    Contract & Billing
                                </h3>

                                <p className="text-sm text-slate-400">
                                    Account and payment information
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">

                            <div>
                                <label className="text-sm font-medium text-slate-300">
                                    Contract
                                </label>

                                <select
                                    name="Contract"
                                    value={formData.Contract}
                                    onChange={handleChange}
                                    className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100"
                                >
                                    <option value="Month-to-month">
                                        Month-to-month
                                    </option>

                                    <option value="One year">
                                        One year
                                    </option>

                                    <option value="Two year">
                                        Two year
                                    </option>
                                </select>
                            </div>


                            <div>
                                <label className="text-sm font-medium text-slate-300">
                                    Paperless Billing
                                </label>

                                <select
                                    name="PaperlessBilling"
                                    value={formData.PaperlessBilling}
                                    onChange={handleChange}
                                    className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100"
                                >
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>


                            <div>
                                <label className="text-sm font-medium text-slate-300">
                                    Payment Method
                                </label>

                                <select
                                    name="PaymentMethod"
                                    value={formData.PaymentMethod}
                                    onChange={handleChange}
                                    className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100"
                                >
                                    <option value="Electronic check">
                                        Electronic check
                                    </option>

                                    <option value="Mailed check">
                                        Mailed check
                                    </option>

                                    <option value="Bank transfer (automatic)">
                                        Bank transfer (automatic)
                                    </option>

                                    <option value="Credit card (automatic)">
                                        Credit card (automatic)
                                    </option>
                                </select>
                            </div>


                            <div>
                                <label className="text-sm font-medium text-slate-300">
                                    Monthly Charges
                                </label>

                                <input
                                    type="number"
                                    step="0.01"
                                    name="MonthlyCharges"
                                    value={formData.MonthlyCharges}
                                    onChange={handleChange}
                                    className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100"
                                />
                            </div>


                            <div>
                                <label className="text-sm font-medium text-slate-300">
                                    Total Charges
                                </label>

                                <input
                                    type="number"
                                    step="0.01"
                                    name="TotalCharges"
                                    value={formData.TotalCharges}
                                    onChange={handleChange}
                                    className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100"
                                />
                            </div>

                        </div>
                    </section>


                    {/* SUBMIT BUTTON */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-5 py-4 font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <BrainCircuit className="h-5 w-5" />

                        {loading
                            ? "Analyzing Customer..."
                            : "Analyze Churn Risk"}
                    </button>

                </form>

            </div>


            {/* RIGHT SIDE — RESULT */}
            <aside className="lg:sticky lg:top-8 lg:self-start">

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">

                    <div className="mb-6 flex items-center gap-3">
                        <Activity className="h-5 w-5 text-indigo-400" />

                        <div>
                            <h3 className="text-lg font-semibold">
                                Prediction
                            </h3>

                            <p className="text-sm text-slate-400">
                                Machine learning churn analysis
                            </p>
                        </div>
                    </div>


                    {!result && !loading && (
                        <div className="rounded-xl border border-dashed border-slate-700 bg-slate-950/50 p-8 text-center">

                            <BrainCircuit className="mx-auto h-10 w-10 text-slate-600" />

                            <p className="mt-4 text-sm text-slate-400">
                                Complete the customer form and click
                                Analyze Churn Risk.
                            </p>

                        </div>
                    )}


                    {loading && (
                        <div className="py-10 text-center">

                            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-700 border-t-indigo-500" />

                            <p className="mt-4 text-slate-400">
                                Running prediction...
                            </p>

                        </div>
                    )}


                    {error && (
                        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4">

                            <p className="font-medium text-red-400">
                                Prediction failed
                            </p>

                            <p className="mt-1 text-sm text-red-300">
                                {error}
                            </p>

                        </div>
                    )}


                    {result && (
                        <div>

                            <div className="mb-6">

                                <p className="text-sm text-slate-400">
                                    Customer Status
                                </p>

                                <h4 className="mt-2 text-3xl font-bold">

                                    {result.prediction === 1
                                        ? "High Churn Risk"
                                        : "Low Churn Risk"}

                                </h4>

                            </div>


                            <div className="mb-2 flex items-center justify-between">

                                <span className="text-sm text-slate-400">
                                    Churn Probability
                                </span>

                                <span className="text-lg font-semibold">
                                    {(result.churn_probability * 100).toFixed(1)}%
                                </span>

                            </div>


                            <div className="h-3 overflow-hidden rounded-full bg-slate-800">

                                <div
                                    className="h-full rounded-full bg-indigo-500 transition-all duration-700"
                                    style={{
                                        width: `${result.churn_probability * 100}%`
                                    }}
                                />

                            </div>


                            <p className="mt-5 text-sm leading-6 text-slate-400">

                                {result.prediction === 1
                                    ? "This customer shows a higher likelihood of leaving the service."
                                    : "This customer currently shows a lower likelihood of churn."}

                            </p>

                        </div>
                    )}

                </div>

            </aside>

        </div>
    );
}

export default CustomerForm;