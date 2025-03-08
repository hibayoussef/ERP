import { useState } from "react";
import ComponentCard from "../../../components/common/ComponentCard";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";

export default function CreateBrand() {
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

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 text-sm font-medium disabled:opacity-50 text-white transition rounded-lg shadow-theme-xs bg-[#575db1] hover:bg-[#474ca1]"
          >
            Submit
          </button>
        </div>
      </div>
    </ComponentCard>
  );
}
