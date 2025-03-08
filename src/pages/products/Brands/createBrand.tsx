import { useState } from "react";
import Flatpickr from "react-flatpickr";
import { CalenderIcon, EyeCloseIcon, EyeIcon, TimeIcon } from "../../../icons";
import ComponentCard from "../../../components/common/ComponentCard";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import Select from "../../../components/form/Select";

export default function CreateBrand() {
  const [showPassword, setShowPassword] = useState(false);
  const options = [
    { value: "marketing", label: "Marketing" },
    { value: "template", label: "Template" },
    { value: "development", label: "Development" },
  ];
  const handleSelectChange = (value: string) => {};
  const [dateOfBirth, setDateOfBirth] = useState("");

  const handleDateChange = (date: Date[]) => {
    setDateOfBirth(date[0].toLocaleDateString());
  };
  return (
    <ComponentCard title="Create Brand">
      <div className="space-y-6">
        <div>
          <Label htmlFor="input">Name</Label>
          <Input type="text" id="input" placeholder="please enter brand name" />
        </div>
        <div>
          <Label htmlFor="inputTwo">Description</Label>
          <Input
            type="text"
            id="inputTwo"
            placeholder="please enter brand description"
          />
        </div>
        <div>
          <Label>Select Input</Label>
          <Select
            options={options}
            placeholder="Select an option"
            onChange={handleSelectChange}
            className="dark:bg-dark-900"
          />
        </div>
        <div>
          <Label htmlFor="tm">Date Picker Input</Label>
          <div className="relative">
            <Input
              type="time"
              id="tm"
              name="tm"
              onChange={(e) => console.log(e.target.value)}
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <TimeIcon className="size-6" />
            </span>
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}
