import { useState } from "react";
import { Link } from "react-router";
import Step1 from "./registerStepps/step1";
import Step2 from "./registerStepps/step2";
import Step3 from "./registerStepps/step3";
import Step4 from "./registerStepps/step4";
import Step5 from "./registerStepps/step5";
import { Formik, Form } from "formik";
import step1Validation from "./registerStepps/validations/step1ValidationSchema";
import step2Validation from "./registerStepps/validations/step2ValidationSchema";
import step3Validation from "./registerStepps/validations/step3ValidationSchema";
import step4Validation from "./registerStepps/validations/step4ValidationSchema";
import step5Validation from "./registerStepps/validations/step5ValidationSchema";
import { useRegister } from "../../hooks/useLogin";

export default function SignUpForm() {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const [formValues, setFormValues] = useState({
    mobile: "",
    email: "",
    organization_name_en: "",
    currency_id: "", 
    organization_name_ar: "",
    country_state_id: "",
    country_id: "",
    password: "",
    time_zone_id: "",
    registered_for_vat: 0,
    postal_code: "",
    city: "",
    street1: "",
    street2: "",
    vat_registered_on: "",
    tax_registration_number_label: "",
    tax_registration_number: "",
    plan_type: "",
    plan_price_id: "",
    plan_id: "",
  });

  const validationSchema = [
    step1Validation,
    step2Validation,
    step3Validation,
    step4Validation,
    step5Validation,
  ];

  const { mutate, isPending } = useRegister();

  const nextStep = async (validateForm, values) => {
    const errors = await validateForm();
    if (Object.keys(errors).length === 0 && step < totalSteps) {
      setFormValues(values);
      setStep(step + 1);
    }
  };

  const prevStep = (event) => {
    event.preventDefault();
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (values, actions) => {
    console.log("Submitting data: ", values);
    if (step < totalSteps) {
      setFormValues(values);
      setStep(step + 1);
    } else {
      mutate(values);
    }
    actions.setTouched({});
    actions.setSubmitting(false);
  };

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto no-scrollbar">
      <div className="flex flex-col justify-center align-center flex-1 w-full max-w-xxl mx-auto">
        <div>
          {/* ✅ Step Indicator */}
          <div className="mb-5 sm:mb-8 text-center mt-6">
            <div className="flex justify-center items-center space-x-4">
              {[...Array(totalSteps)].map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-13 rounded-full ${
                    step > index ? "bg-[#575db1]" : "bg-gray-300"
                  }`}
                ></div>
              ))}
            </div>
          </div>

          {/* ✅ Formik Wrapper */}
          <Formik
            initialValues={formValues}
            validationSchema={validationSchema[step - 1]}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ isSubmitting, validateForm, values }) => (
              <Form className="flex flex-col flex-1 w-full overflow-y-auto no-scrollbar">
                <div className="space-y-5 w-full">
                  <div className="w-full">
                    {step === 1 && <Step1 />}
                    {step === 2 && <Step2 />}
                    {step === 3 && <Step3 />}
                    {step === 4 && <Step4 />}
                    {step === 5 && <Step5 />}
                  </div>

                  {/* ✅ Navigation Buttons */}
                  <div className="flex space-x-4 max-w-xl mx-auto">
                    <button
                      onClick={prevStep}
                      disabled={step === 1}
                      className="flex items-center justify-center w-full px-4 py-3 text-sm disabled:opacity-50 font-medium text-white transition rounded-lg bg-gray-500 shadow-theme-xs hover:bg-brand-600"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (step < totalSteps) {
                          nextStep(validateForm, values);
                        } else {
                          handleSubmit(values, { setSubmitting: () => {} });
                        }
                      }}
                      disabled={isSubmitting}
                      className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium disabled:opacity-50 text-white transition rounded-lg bg-[#575db1] shadow-theme-xs hover:bg-brand-600"
                    >
                      {isPending ? (
                        <div role="status">
                          <svg
                            aria-hidden="true"
                            className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : 
                        "Next"}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>

          {/* ✅ Already Have an Account Section */}
          {step === 1 && (
            <div className="mt-5 max-w-xl mx-auto">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Already have an account?
                <Link
                  to="/signin"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign In
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
