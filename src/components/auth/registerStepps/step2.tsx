import { useCommonStore } from "../../../store/useCommonStore";
import Input from "../../form/input/InputField";
import Label from "../../form/Label";

export default function Step2() {
  const { zipCode, timeZone } = useCommonStore();
  return (
    <div className="flex flex-col w-full overflow-y-auto no-scrollbar">
      <div className="flex flex-col justify-center w-full mx-auto">
        <div className="w-full">
          <div className="mb-5 sm:mb-8 text-center">
            <h2 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90">
              Organization Address
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your Organization Address!
            </p>
          </div>
          <form className="w-full">
            <div className="space-y-5 w-full">
              <div className="grid grid-cols-1 gap-5  w-full">
                <div className="w-full">
                  <Label>City</Label>
                  <Input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="Enter your City"
                    className="w-full"
                  />
                </div>
                <div className="sm:col-span-1 sm:grid-cols-2 flex space-x-5">
                  <div className="w-full">
                    <Label>Street 1</Label>
                    <Input
                      type="text"
                      id="street1"
                      name="street1"
                      placeholder="Enter your Street 1"
                      className="w-full"
                    />
                  </div>
                  <div className="w-full">
                    <Label>Street 2</Label>
                    <Input
                      type="text"
                      id="street2"
                      name="street2"
                      placeholder="Enter your Street 2"
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="border-t border-gray-300 my-4" />
                <div className="w-full">
                  <Label>Postal Code</Label>
                  <Input
                    type="text"
                    id="postal_code"
                    name="postal_code"
                    value={zipCode || ""}
                    readOnly
                    className="w-full"
                  />
                </div>
                <div className="w-full">
                  <Label>Time Zone</Label>
                  <Input
                    type="text"
                    id="time_zone"
                    name="time_zone"
                    value={ "(" + timeZone?.offset + ")" + " " + timeZone?.name || ""}
                    readOnly
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
