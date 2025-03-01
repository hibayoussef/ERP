import { useState } from "react";
import { useFetchPlans } from "../../../hooks/useCommon";

export default function Step5() {
  const { data: plans } = useFetchPlans();
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [selectedCurrency, setSelectedCurrency] = useState(1); // Default: USD

  return (
    <div className="w-full mx-auto py-12 px-4 sm:px-12 lg:px-12">
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
      <div className="mt-12 space-y-3 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 md:max-w-5xl md:mx-auto xl:grid-cols-3">
        {plans?.message.map((plan) => {
          const price = plan.prices.find(
            (p) => p.currency === selectedCurrency
          );

          return (
            <div
              key={plan.id}
              className="border border-slate-200 rounded-lg shadow-sm divide-y divide-slate-200"
            >
              <div className="p-6">
                <h2 className="text-xl leading-6 font-bold text-slate-900">
                  {plan.plan_name_ar}
                </h2>
                <p className="mt-2 text-base text-slate-700 leading-tight">
                  {plan.plan_description_ar}
                </p>
                <p className="mt-8">
                  <span className="text-4xl font-bold text-slate-900 tracking-tighter">
                    {billingCycle === "monthly"
                      ? price?.monthly_price_ar
                      : price?.yearly_price_ar}
                  </span>
                  <span className="text-base font-medium text-slate-500">
                    /{billingCycle === "monthly" ? "شهر" : "سنة"}
                  </span>
                </p>
                <a
                  href="/sign-up"
                  className="mt-8 block w-full bg-slate-900 rounded-md py-2 text-sm font-semibold text-white text-center"
                >
                  اختر الخطة
                </a>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h3 className="text-sm font-bold text-slate-900 tracking-wide uppercase">
                  What's included
                </h3>
                <ul role="list" className="mt-4 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature.id} className="flex space-x-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="flex-shrink-0 h-5 w-5 text-green-400"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M5 12l5 5l10 -10"></path>
                      </svg>
                      <span className="text-base text-slate-700">
                        {feature.feature_ar}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Usage example:
// <PricingSection plans={plansData} />
