import * as Yup from "yup";

export const step2ValidationSchema = Yup.object({
  city: Yup.string().required("City is required"),
  street1: Yup.string().required("Street 1 is required"),
  street2: Yup.string().required("Street 2 is required"),
  postal_code: Yup.string().required("Postal Code is required"),
  time_zone: Yup.string().required("Time Zone is required"),
});
