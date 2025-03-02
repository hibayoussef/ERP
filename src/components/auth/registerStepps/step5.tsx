import { useState } from "react";
import { useFetchPlans } from "../../../hooks/useCommon";

export default function Step5() {
  const { data: plans } = useFetchPlans();
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [selectedCurrency, setSelectedCurrency] = useState(1); // Default: USD

  return (
    <div className="w-full mx-auto py-12 px-4 sm:px-12 lg:px-12">
      <div className="mb-5 sm:mb-8 text-center">
        <h2 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90">
          Subscriptions & Plans
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Enter your Subscriptions & Plans!
        </p>
      </div>
      {/* Billing Toggle */}
      <div className="flex justify-center mb-12">
        <div className="bg-gray-100 p-1 rounded-full">
          <button
            onClick={(e) => {
              e.preventDefault();
              setBillingCycle("monthly");
            }}
            className={`px-6 py-2 rounded-full ${
              billingCycle === "monthly"
                ? "bg-[#575db1] text-white"
                : "text-gray-600"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setBillingCycle("yearly");
            }}
            className={`px-6 py-2 rounded-full ${
              billingCycle === "yearly"
                ? "bg-[#575db1] text-white"
                : "text-gray-600"
            }`}
          >
            Annually
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="mt-12 space-y-3 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 md:max-w-5xl md:mx-auto xl:grid-cols-3">
        {plans?.data.map((plan) => {
          const price = plan.prices.find(
            (p) => p.currency === selectedCurrency
          );

          return (
            <div
              key={plan.id}
              // className="border border-slate-200 rounded-xl shadow-sm divide-y divide-slate-200 overflow-hidden"
              className={`border border-slate-200 rounded-xl  ${
                plan.plan_name_en.toLowerCase() === "standard"
                  ? "bg-slate-800"
                  : ""
              } shadow-sm divide-y divide-slate-200 overflow-hidden ${
                plan.plan_name_en.toLowerCase() === "standard"
                  ? "border-2 border-state-800 shadow-lg shadow-xl"
                  : ""
              }`}
            >
              <div className="p-6">
                <h2
                  className={`text-xl leading-6 font-bold text-slate-700 ${
                    plan.plan_name_en.toLowerCase() === "standard"
                      ? "text-slate-200"
                      : ""
                  }`}
                >
                  {plan.plan_name_en}
                </h2>
                <p
                  className={`mt-2 text-base text-slate-700 leading-tight ${
                    plan.plan_name_en.toLowerCase() === "standard"
                      ? "text-slate-200"
                      : ""
                  }`}
                >
                  {plan.plan_description_en}
                </p>
                <p className="mt-8">
                  <span
                    className={`text-3xl font-bold text-slate-900 ${
                      plan.plan_name_en.toLowerCase() === "standard"
                        ? "text-slate-200"
                        : ""
                    } tracking-tighter`}
                  >
                    {billingCycle === "monthly"
                      ? price?.monthly_price_en
                      : price?.yearly_price_en}
                  </span>
                  <span
                    className={`text-base font-medium text-slate-500 ${
                      plan.plan_name_en.toLowerCase() === "standard"
                        ? "text-slate-200"
                        : ""
                    }`}
                  >
                    /{billingCycle === "monthly" ? "month" : "year"}
                  </span>
                </p>
              </div>
              <div className="pt-6 pb-8 px-6">
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
                      <span
                        className={`text-base text-slate-700 ${
                          plan.plan_name_en.toLowerCase() === "standard"
                            ? "text-slate-200"
                            : ""
                        }`}
                      >
                        {feature.feature_en}
                      </span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/sign-up"
                  className="mt-8 block w-full bg-[#575db1] rounded-md py-4 text-sm font-semibold text-white text-center"
                >
                  Choose Plan
                </a>
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
