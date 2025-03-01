// src/components/auth/registerStepps/step5.tsx
import { useState, useEffect } from "react";
import { useFetchPlans } from "../../../hooks/useCommon";

export default function Step5() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const { data: plans } = useFetchPlans() 
  

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    <div className="flex flex-col w-full overflow-y-auto no-scrollbar">
      <div className="flex flex-col justify-center w-full mx-auto">
        <div className="w-full">
          <div className="mb-5 sm:mb-8 text-center">
            <h2 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90">
              اختر خطة
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              اختر خطة تناسب احتياجاتك!
            </p>
          </div>
          <div className="space-y-5 w-full">
            {plans?.message.map((plan) => (
              <div key={plan.id} className="border p-4 rounded-md">
                <h3 className="font-semibold">{plan.plan_name_en}</h3>
                <p>{plan.plan_description_en}</p>
                <div className="mt-2">
                  {plan.prices.map((price) => (
                    <div key={price.id}>
                      <span>
                        {price.monthly_price_en} / {price.yearly_price_en}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => handlePlanSelect(plan)}
                  className={`mt-2 p-2 rounded-md ${
                    selectedPlan === plan
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {selectedPlan === plan ? "تم اختيارها" : "اختر هذه الخطة"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
