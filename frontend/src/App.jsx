import {
  BrainCircuit,
  Activity
} from "lucide-react";

import CustomerForm from "./components/CustomerForm";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10">
              <BrainCircuit className="h-6 w-6 text-indigo-400" />
            </div>

            <div>
              <h1 className="text-xl font-semibold">
                Telco Churn Intelligence
              </h1>

              <p className="text-sm text-slate-400">
                Machine Learning Prediction Platform
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <section className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm text-emerald-400">
            <Activity className="h-4 w-4" />
            Prediction System
          </div>

          <h2 className="text-3xl font-bold">
            Customer Churn Prediction
          </h2>

          <p className="mt-3 max-w-2xl text-slate-400">
            Enter customer details below to estimate churn risk.
          </p>
        </section>

        <CustomerForm />
      </main>
    </div>
  );
}

export default App;
