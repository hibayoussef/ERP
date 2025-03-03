// import * as Yup from "yup";

// export const step3ValidationSchema = Yup.object({
//   email: Yup.string()
//     .email("Invalid email address")
//     .required("Email is required"),
//   mobile: Yup.string()
//     .matches(/^[0-9]{10}$/, "Mobile number is not valid") 
//     .required("Mobile number is required"),
//   password: Yup.string()
//     .min(6, "Password must be at least 6 characters")
//     .required("Password is required"),
// });
import * as Yup from "yup";

const step3Validation = Yup.object({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  mobile: Yup.string().required("Mobile number is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

export default step3Validation;
