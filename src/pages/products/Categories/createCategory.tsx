import { useState } from "react";
import ComponentCard from "../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import Input from "../../../components/form/input/InputField";
import TextArea from "../../../components/form/input/TextArea";
import Label from "../../../components/form/Label";
import { useAddCategory } from "../../../hooks/prouducts/useCategories";
import { useMeStore } from "../../../store/useMeStore";

export default function CreateCategory() {
  const [category_name_ar, setCategory_name_ar] = useState("");
  const [category_name_en, setCategory_name_en] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [code, setCode] = useState("");

  const addCategory = useAddCategory();
  const organizationId = useMeStore((state) => state.organizationId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addCategory.mutateAsync({
      organization_id: organizationId,
      category_name_en: category_name_en,
      category_name_ar: category_name_ar,
      description_en: descriptionEn,
      description_ar: descriptionAr,
      code: code,
    });
  };

  return (
    <>
      <PageBreadcrumb
        baseLink="/categories"
        baseTitle="Category"
        pageTitle="Create Category"
      />

      <ComponentCard title="Create Category">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <Label htmlFor="input-en">Name(En)</Label>
              <Input
                type="text"
                id="input-en"
                placeholder="Please enter category name"
                value={category_name_en}
                onChange={(e) => setCategory_name_en(e.target.value)}
              />
            </div>
            <div>
              <Label>Description(En)</Label>
              <TextArea
                rows={6}
                value={descriptionEn}
                onChange={(value) => setDescriptionEn(value)}
              />
            </div>

            <div className="w-full h-px bg-gray-200 dark:bg-gray-600 mb-2"></div>

            <div>
              <Label htmlFor="input-ar">Name(Ar)</Label>
              <Input
                type="text"
                id="input-ar"
                placeholder="Please enter category name in Arabic"
                value={category_name_ar}
                onChange={(e) => setCategory_name_ar(e.target.value)}
              />
            </div>
            <div>
              <Label>Description(Ar)</Label>
              <TextArea
                rows={6}
                value={descriptionAr}
                onChange={(value) => setDescriptionAr(value)}
              />
            </div>

            <div>
              <Label htmlFor="code">Code</Label>
              <Input
                type="text"
                id="code"
                placeholder="Enter category code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
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
