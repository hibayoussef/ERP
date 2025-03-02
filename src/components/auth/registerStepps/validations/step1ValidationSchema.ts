import * as Yup from "yup";

export const step1ValidationSchema = Yup.object({
  organizationName: Yup.string().required("Organization Name is required"),
  industry: Yup.string().required("Industry is required"),
  location: Yup.string().required("Location is required"),
  countryState: Yup.string().required("Emirate is required"),
});
