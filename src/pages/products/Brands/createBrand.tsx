import { useState } from "react";
import ComponentCard from "../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import Input from "../../../components/form/input/InputField";
import TextArea from "../../../components/form/input/TextArea";
import Label from "../../../components/form/Label";
import { useAddBrand } from "../../../hooks/prouducts/useBrands";
import { useMeStore } from "../../../store/useMeStore";

export default function CreateBrand() {
  const [descriptionAr, setDescriptionAr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [brandNameEn, setBrandNameEn] = useState("");
  const [brandNameAr, setBrandNameAr] = useState("");
  const addBrand = useAddBrand();
  const organizationId = useMeStore((state) => state.organizationId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addBrand.mutateAsync({
      organization_id: organizationId,
      brand_name_en: brandNameEn,
      brand_name_ar: brandNameAr,
      description_en: descriptionEn,
      description_ar: descriptionAr,
    });
  };

  return (
    <>
      <PageBreadcrumb
        baseLink="/brands"
        baseTitle="Brand"
        pageTitle="Create Brand"
      />

      <ComponentCard title="Create Brand">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <Label htmlFor="input">Name(En)</Label>
              <Input
                type="text"
                id="input"
                placeholder="please enter brand name"
                value={brandNameEn}
                onChange={(e) => setBrandNameEn(e.target.value)}
              />
            </div>
            <div>
              <Label>Description(En)</Label>
              <TextArea
                rows={6}
                value={descriptionEn}
                error
                onChange={(value) => setDescriptionEn(value)}
              />
            </div>

            <div
              className="w-full h-px bg-gray-200 dark:bg-gray-600 mb-2"
              style={{ boxSizing: "border-box" }}
            ></div>
            <div>
              <Label htmlFor="input">Name(Ar)</Label>
              <Input
                type="text"
                id="input"
                placeholder="please enter brand name"
                value={brandNameAr}
                onChange={(e) => setBrandNameAr(e.target.value)}
              />
            </div>
            <div>
              <Label>Description(Ar)</Label>
              <TextArea
                rows={6}
                value={descriptionAr}
                error
                onChange={(value) => setDescriptionAr(value)}
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
        </form>
      </ComponentCard>
    </>
  );
}
