import { useAddSubCategory } from "@/hooks/prouducts/useSubCategories";
import { useState } from "react";
import ComponentCard from "../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import Input from "../../../components/form/input/InputField";
import TextArea from "../../../components/form/input/TextArea";
import Label from "../../../components/form/Label";

export default function CreateSubCategory() {
  const [sub_category_name_ar, setSub_category_name_ar] = useState("");
  const [sub_category_name_en, setSub_category_name_en] = useState("");
  const [description_ar, setDescriptionAr] = useState("");
  const [description_en, setDescriptionEn] = useState("");
  const [code, setCode] = useState("");

  const addSubCategory = useAddSubCategory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addSubCategory.mutateAsync({
      category_id: 1,
      sub_category_name_en: sub_category_name_en,
      sub_category_name_ar: sub_category_name_ar,
      description_en: description_en,
      description_ar: description_ar,
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
                value={sub_category_name_en}
                onChange={(e) => setSub_category_name_en(e.target.value)}
              />
            </div>
            <div>
              <Label>Description(En)</Label>
              <TextArea
                rows={6}
                value={description_en}
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
                value={sub_category_name_ar}
                onChange={(e) => setSub_category_name_ar(e.target.value)}
              />
            </div>
            <div>
              <Label>Description(Ar)</Label>
              <TextArea
                rows={6}
                value={description_ar}
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
