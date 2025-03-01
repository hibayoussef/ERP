import { useFetchIndustry } from "../../../hooks/useCommon";
import Input from "../../form/input/InputField";
import Label from "../../form/Label";

export default function Step2() {
  const { data: industries, isLoading } = useFetchIndustry();

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
              <div className="grid grid-cols-1 gap-5  w-full">
                <div className="sm:col-span-1 w-full">
                  <Label>
                    Organization Name<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="fname"
                    name="fname"
                    placeholder="Enter your Organization name"
                    className="w-full"
                  />
                </div>
                <div className="sm:col-span-1 w-full">
                  <Label>
                    Industry<span className="text-error-500">*</span>
                  </Label>
                  <select
                    id="industry"
                    name="industry"
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="">Select an industry</option>
                    {industries?.data.map((industry) => (
                      <option key={industry.id} value={industry.id}>
                        {industry.name_en}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-1 sm:grid-cols-2 flex space-x-5">
                  <div className="w-full">
                    <Label>
                      Organization Country States
                      <span className="text-error-500">*</span>
                    </Label>
                    <select
                      id="country_states"
                      name="country_states"
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      <option value="">Select an industry</option>
                      {industries?.data.map((industry) => (
                        <option key={industry.id} value={industry.id}>
                          {industry.name_en}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full">
                    <Label>
                      Organization Location
                      <span className="text-error-500">*</span>
                    </Label>
                    <select
                      id="location"
                      name="location"
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      <option value="">Select a location</option>
                      {industries?.data.map((industry) => (
                        <option key={industry.id} value={industry.id}>
                          {industry.name_en}
                        </option>
                      ))}
                    </select>
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
