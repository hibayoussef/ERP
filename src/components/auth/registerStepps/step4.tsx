import { useState } from "react";
import Input from "../../form/input/InputField";
import Label from "../../form/Label";
import { EyeCloseIcon, EyeIcon } from "../../../icons";

export default function Step4() {
  const [registeredForVAT, setRegisteredForVAT] = useState(false);

  return (
    <div className="flex flex-col w-full overflow-y-auto no-scrollbar">
      <div className="flex flex-col justify-center w-full mx-auto max-w-xl">
        <div className="w-full">
          <div className="mb-5 sm:mb-8 text-center">
            <h2 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90">
              Tax & VAT Information
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your Tax & VAT Information!
            </p>
          </div>
          <form className="w-full">
            <div className="space-y-5 w-full">
              <div className="flex items-center justify-between mr-4">
                <Label>Is This business registered for VAT</Label>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={registeredForVAT}
                    onChange={() => setRegisteredForVAT(!registeredForVAT)}
                    className="sr-only peer "
                  />
                  <div
                    className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4
                   peer-focus:ring-blue-300 dark:peer-focus:ring-[#575db1] rounded-full peer
                    dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full
                     peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px]
                      after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
                       dark:border-gray-600 peer-checked:bg-[#575db1] dark:peer-checked:bg-[#575db1]"
                  ></div>
                </label>
              </div>

              {/* {!registeredForVAT && ( */}
              <>
                <div className="w-full flex space-x-2">
                  <div className="w-full">
                    <Label>Tax Registration Number Label</Label>
                    <Input
                      type="text"
                      id="tax_registration_number_label"
                      name="tax_registration_number_label"
                      placeholder="Enter Tax Registration Number Label"
                      className="w-full"
                      disabled={!registeredForVAT} // Disable if not registered
                    />
                  </div>
                  <div className="w-full">
                    <Label>
                      Tax Registration Number (TRN)
                      <span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="tax_registration_number"
                      name="tax_registration_number"
                      placeholder="Enter Tax Registration Number"
                      className="w-full"
                      disabled={!registeredForVAT} // Disable if not registered
                    />
                  </div>
                </div>
                <div className="w-full flex space-x-2">
                  <div className="w-full">
                    <Label>
                      VAT Registered On
                      <span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="date"
                      id="vat_registered_on"
                      name="vat_registered_on"
                      className="w-full"
                      disabled={!registeredForVAT} // Disable if not registered
                    />
                  </div>
                  <div className="w-full">
                    <Label>
                      Currency
                      <span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="currency"
                      name="currency"
                      placeholder="Enter Currency"
                      className="w-full"
                      disabled={!registeredForVAT} // Disable if not registered
                    />
                  </div>
                </div>
              </>
              {/* )} */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
