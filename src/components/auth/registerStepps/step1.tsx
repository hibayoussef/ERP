import { useState } from "react";
import { useFetchCountries, useFetchIndustry } from "../../../hooks/useCommon";
import Input from "../../form/input/InputField";
import Label from "../../form/Label";
import { CountryState } from "../../../types/common";
import { useCommonStore } from "../../../store/useCommonStore";

export default function Step1() {
  const { data: industries } = useFetchIndustry();
  const { data: countries } = useFetchCountries();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryStates, setCountryStates] = useState<CountryState[]>([]);
  const { setZipCode, setTimeZone } = useCommonStore();
  const handleCountryChange = (event) => {
    const countryId = event.target.value;
    setSelectedCountry(countryId);
    const selectedCountryData = countries?.data.find(
      (country) => country.id === parseInt(countryId)
    );
    setCountryStates(
      selectedCountryData ? selectedCountryData.country_states : []
    );
  };

  const handleStateChange = (event) => {
    const stateId = event.target.value;
    const selectedState = countryStates.find(
      (state) => state.id === parseInt(stateId)
    );
    if (selectedState) {
      setZipCode(selectedState.zip_code);
      setTimeZone(selectedState.time_zone);
    }
  };

  return (
    <div className="flex flex-col w-full overflow-y-auto no-scrollbar">
      <div className="flex flex-col justify-center w-full mx-auto max-w-xl">
        <div className="w-full">
          <div className="mb-5 sm:mb-8 text-center">
            <h2 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90">
              Organization Details
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your Organization Details!
            </p>
          </div>
          <form className="w-full">
            <div className="space-y-5 w-full">
              <div className="grid grid-cols-1 gap-5 w-full">
                <div className="w-full">
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
                <div className="w-full">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                  <div className="w-full">
                    {" "}
                    <Label>
                      Organization Location
                      <span className="text-error-500">*</span>
                    </Label>
                    <select
                      id="location"
                      name="location"
                      onChange={handleCountryChange}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      <option value="">Select a location</option>
                      {countries?.data.map((country) => (
                        <option key={country.id} value={country.id}>
                          {country.name_en}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full">
                    <Label>
                      Emirate
                      <span className="text-error-500">*</span>
                    </Label>
                    <select
                      id="country_states"
                      name="country_states"
                      onChange={handleStateChange}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      <option value="">
                        {selectedCountry
                          ? "Select a Emirate"
                          : "No Location selected"}
                      </option>
                      {countryStates.map((state) => (
                        <option key={state.id} value={state.id}>
                          {state.name_en}
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
