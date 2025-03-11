import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ComponentCard from "../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import Input from "../../../components/form/input/InputField";
import TextArea from "../../../components/form/input/TextArea";
import Label from "../../../components/form/Label";
import { useMeStore } from "../../../store/useMeStore";
import {
  useAddBrand,
  useFetchBrand,
  useUpdateBrand,
} from "@/hooks/prouducts/useBrands";

export default function BrandForm() {
  const { id } = useParams();
  const isUpdate = Boolean(id);
  const addBrand = useAddBrand();
  const updateBrand = useUpdateBrand();
  const organizationId = useMeStore((state) => state.organizationId);

  const { data: brandData, isLoading } = useFetchBrand(Number(id), {
    enabled: isUpdate,
  });

  const [descriptionAr, setDescriptionAr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [brandNameEn, setBrandNameEn] = useState("");
  const [brandNameAr, setBrandNameAr] = useState("");

  useEffect(() => {
    if (brandData) {
      setDescriptionAr(brandData?.description_ar || "");
      setDescriptionEn(brandData?.description_en || "");
      setBrandNameEn(brandData?.brand_name_en || "");
      setBrandNameAr(brandData?.brand_name_ar || "");
    }
  }, [brandData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      organization_id: organizationId,
      brand_name_en: brandNameEn,
      brand_name_ar: brandNameAr,
      description_en: descriptionEn,
      description_ar: descriptionAr,
    };

    if (isUpdate && id) {
      await updateBrand.mutateAsync({
        id: Number(id),
        data: payload,
      });
    } else {
      await addBrand.mutateAsync(payload);
    }
  };

  return (
    <>
      <PageBreadcrumb
        baseLink="/brands"
        baseTitle="Brand"
        pageTitle={isUpdate ? "Update Brand" : "Create Brand"}
      />

      <ComponentCard title={isUpdate ? "Update Brand" : "Create Brand"}>
        {isUpdate && isLoading ? (
          <p>Loading brand data...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <Label htmlFor="input">Name (En)</Label>
                <Input
                  type="text"
                  id="input"
                  placeholder="Please enter brand name"
                  value={brandNameEn}
                  onChange={(e) => setBrandNameEn(e.target.value)}
                />
              </div>
              <div>
                <Label>Description (En)</Label>
                <TextArea
                  rows={6}
                  value={descriptionEn}
                  onChange={(value) => setDescriptionEn(value)}
                />
              </div>

              <div className="w-full h-px bg-gray-200 dark:bg-gray-600 mb-2"></div>

              <div>
                <Label htmlFor="input">Name (Ar)</Label>
                <Input
                  type="text"
                  id="input"
                  placeholder="Please enter brand name"
                  value={brandNameAr}
                  onChange={(e) => setBrandNameAr(e.target.value)}
                />
              </div>
              <div>
                <Label>Description (Ar)</Label>
                <TextArea
                  rows={6}
                  value={descriptionAr}
                  onChange={(value) => setDescriptionAr(value)}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 text-sm font-medium disabled:opacity-50 text-white transition rounded-lg shadow-theme-xs bg-[#575db1] hover:bg-[#474ca1]"
                >
                  {isUpdate ? "Update" : "Create"}
                </button>
              </div>
            </div>
          </form>
        )}
      </ComponentCard>
    </>
  );
}
