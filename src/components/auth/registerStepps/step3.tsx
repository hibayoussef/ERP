import { useState } from "react";
import Input from "../../form/input/InputField";
import Label from "../../form/Label";
import { EyeCloseIcon, EyeIcon } from "../../../icons";
import { useFormikContext } from "formik";

export default function Step3() {
  const [showPassword, setShowPassword] = useState(false);
  const { errors, touched, handleChange, handleBlur, values } =
    useFormikContext<{ email: string; password: string; mobile: string }>();

  const passwordRules = [
    {
      text: "At least 8 characters",
      check: (pass: string) => pass.length >= 8,
    },
    {
      text: "At least one symbol",
      check: (pass: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pass),
    },
    {
      text: "At least one number",
      check: (pass: string) => /\d/.test(pass),
    },
    {
      text: "At least one uppercase and one lowercase letter",
      check: (pass: string) => /[a-z]/.test(pass) && /[A-Z]/.test(pass),
    },
  ];

  return (
    <div className="flex flex-col w-full overflow-y-auto no-scrollbar">
      <div className="flex flex-col justify-center w-full mx-auto max-w-xl">
        <div className="w-full">
          <div className="mb-5 sm:mb-8 text-center">
            <h2 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90">
              Contact Information
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your Contact Information!
            </p>
          </div>
          <form className="w-full">
            <div className="space-y-5 w-full">
              <div className="grid grid-cols-1 gap-5 w-full">
                {/* Email Field */}
                <div className="w-full">
                  <Label>
                    Email <span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="info@gmail.com"
                    className="w-full"
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>

                {/* Mobile Field */}
                <div className="w-full">
                  <Label>
                    Mobile <span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="tel"
                    name="mobile"
                    value={values.mobile}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your Mobile Number"
                    className="w-full"
                  />
                  {errors.mobile && touched.mobile && (
                    <p className="text-red-500 text-sm">{errors.mobile}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="w-full">
                  <Label>
                    Password <span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter your password"
                      className="w-full"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                  {errors.password && touched.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-[auto,1fr] gap-x-3 gap-y-2 mt-2">
                    {passwordRules.map((rule, index) => {
                      const isValid = rule.check(values.password);
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm"
                        >
                          <span
                            className={`w-6 h-6 flex items-center justify-center rounded-full border-2 transition-all duration-200 ${
                              isValid
                                ? "border-green-600 bg-green-600 text-white"
                                : "border-gray-400 text-gray-400"
                            }`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 h-4"
                              viewBox="0 0 24 24"
                              fill={isValid ? "white" : "gray"}
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 16.17l-3.88-3.88a1 1 0 10-1.42 1.42l4.6 4.6a1 1 0 001.42 0l8.6-8.6a1 1 0 00-1.42-1.42L9 16.17z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                          <span
                            className={
                              isValid ? "text-green-600" : "text-gray-500"
                            }
                          >
                            {rule.text}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
