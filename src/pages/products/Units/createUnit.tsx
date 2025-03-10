import { useState } from "react";
import ComponentCard from "../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import { useMeStore } from "../../../store/useMeStore";
import { useAddUnit } from "@/hooks/prouducts/useUnits";

export default function CreateUnit() {
  const addUnit = useAddUnit();
  const organizationId = useMeStore((state) => state.organizationId);
  const [unitNameAr, setUnitNameAr] = useState("");
  const [unitNameEn, setUnitNameEn] = useState("");
  const [shortNameAr, setShortNameAr] = useState("");
  const [shortNameEn, setShortNameEn] = useState("");
  const [allowDecimal, setAllowDecimal] = useState(false);
  const [multiplier, setMultiplier] = useState(1);
  const [subUnits, setSubUnits] = useState([
    {
      organization_id: organizationId ?? 0,
      unit_name_ar: "",
      unit_name_en: "",
      short_name_ar: "",
      short_name_en: "",
      allow_decimal: false,
      multiplier: 1,
    },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addUnit.mutateAsync({
      organization_id: organizationId,
      unit_name_ar: unitNameAr,
      unit_name_en: unitNameEn,
      short_name_ar: shortNameAr,
      short_name_en: shortNameEn,
      allow_decimal: allowDecimal,
      multiplier,
      sub_units: subUnits.map((sub) => ({
        ...sub,
        organization_id: organizationId ?? 0,
      })),
    });
  };

  return (
    <>
      <PageBreadcrumb
        baseLink="/units"
        baseTitle="Unit"
        pageTitle="Create Unit"
      />

      <ComponentCard title="Create Unit">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Main Unit Fields */}
            <div>
              <Label htmlFor="unit-name-ar">Unit Name (Ar)</Label>
              <Input
                type="text"
                id="unit-name-ar"
                value={unitNameAr}
                onChange={(e) => setUnitNameAr(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="unit-name-en">Unit Name (En)</Label>
              <Input
                type="text"
                id="unit-name-en"
                value={unitNameEn}
                onChange={(e) => setUnitNameEn(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="short-name-ar">Short Name (Ar)</Label>
              <Input
                type="text"
                id="short-name-ar"
                value={shortNameAr}
                onChange={(e) => setShortNameAr(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="short-name-en">Short Name (En)</Label>
              <Input
                type="text"
                id="short-name-en"
                value={shortNameEn}
                onChange={(e) => setShortNameEn(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="allow-decimal">Allow Decimal</Label>
              <input
                type="checkbox"
                id="allow-decimal"
                checked={allowDecimal}
                onChange={(e) => setAllowDecimal(e.target.checked)}
              />
            </div>

            <div>
              <Label htmlFor="multiplier">Multiplier</Label>
              <Input
                type="number"
                id="multiplier"
                value={multiplier}
                onChange={(e) => setMultiplier(Number(e.target.value))}
              />
            </div>

            {/* Sub Units */}
            {subUnits.map((sub, index) => (
              <div key={index} className="border p-4 rounded-md">
                <h3 className="mb-2">Sub Unit {index + 1}</h3>
                <Input
                  type="text"
                  placeholder="Unit Name (Ar)"
                  value={sub.unit_name_ar}
                  onChange={(e) => {
                    const newSubUnits = [...subUnits];
                    newSubUnits[index].unit_name_ar = e.target.value;
                    setSubUnits(newSubUnits);
                  }}
                />
                <Input
                  type="text"
                  placeholder="Unit Name (En)"
                  value={sub.unit_name_en}
                  onChange={(e) => {
                    const newSubUnits = [...subUnits];
                    newSubUnits[index].unit_name_en = e.target.value;
                    setSubUnits(newSubUnits);
                  }}
                />
                <button
                  type="button"
                  onClick={() =>
                    setSubUnits(subUnits.filter((_, i) => i !== index))
                  }
                  className="mt-2 text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                setSubUnits([
                  ...subUnits,
                  {
                    organization_id: organizationId ?? 0,
                    unit_name_ar: "",
                    unit_name_en: "",
                    short_name_ar: "",
                    short_name_en: "",
                    allow_decimal: false,
                    multiplier: 1,
                  },
                ])
              }
              className="text-blue-500"
            >
              + Add Sub Unit
            </button>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 text-sm font-medium disabled:opacity-50 text-white transition rounded-lg shadow-theme-xs bg-[#575db1] hover:bg-[#474ca1]"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </ComponentCard>
    </>
  );
}
