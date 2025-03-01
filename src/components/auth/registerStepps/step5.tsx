import { useState } from "react";
import { useFetchPlans } from "../../../hooks/useCommon";

export default function Step5() {
  const { data: plans } = useFetchPlans();
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [selectedCurrency, setSelectedCurrency] = useState(1); // Default: USD

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Currency Selector */}
      <div className="flex justify-center mb-8">
        <select
          onChange={(e) => setSelectedCurrency(Number(e.target.value))}
          className="px-4 py-2 border rounded-lg"
        >
          <option value={1}>USD</option>
          <option value={2}>EUR</option>
          <option value={4}>AED</option>
          <option value={9}>SAR</option>
        </select>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center mb-12">
        <div className="bg-gray-100 p-1 rounded-full">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-6 py-2 rounded-full ${
              billingCycle === "monthly"
                ? "bg-blue-600 text-white"
                : "text-gray-600"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`px-6 py-2 rounded-full ${
              billingCycle === "yearly"
                ? "bg-blue-600 text-white"
                : "text-gray-600"
            }`}
          >
            Annually
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-3">
        {plans?.message.map((plan) => {
          const price = plan.prices.find(
            (p) => p.currency === selectedCurrency
          );

          return (
            <div
              key={plan.id}
              className="border rounded-xl p-6 hover:border-blue-500 transition-all"
            >
              <h3 className="text-2xl font-bold mb-2">{plan.plan_name_ar}</h3>
              <p className="text-gray-600 mb-4">{plan.plan_description_ar}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold">
                  {billingCycle === "monthly"
                    ? price?.monthly_price_ar
                    : price?.yearly_price_ar}
                </span>
                <span className="text-gray-600">
                  /{billingCycle === "monthly" ? "شهر" : "سنة"}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature.id} className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature.feature_ar}
                  </li>
                ))}
              </ul>

              <button className="w-full py-3 px-6 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
                اختر الخطة
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Usage example:
// <PricingSection plans={plansData} />
