import { useState } from "react";
import Input from "../../form/input/InputField";
import Label from "../../form/Label";
import { EyeCloseIcon, EyeIcon } from "../../../icons";

export default function Step3() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col w-full overflow-y-auto no-scrollbar">
      <div className="flex flex-col justify-center w-full mx-auto">
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
                <div className="w-full">
                  <Label>
                    Email
                    <span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="info@gmail.com"
                    className="w-full"
                  />
                </div>
                <div className="w-full">
                  <Label>
                    Mobile
                    <span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    placeholder="Enter your Mobile Number"
                    className="w-full"
                  />
                </div>
                <div className="w-full">
                  <Label>
                    Password <span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      name="password"
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
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
