// import * as Yup from "yup";

// // مثال للتحقق في Step4 مع شرط عند التسجيل لضريبة القيمة المضافة (VAT)
// export const step4ValidationSchema = Yup.object({
//   // تحقق من حقل Tax Registration Number Label بناءً على التسجيل في VAT
//   tax_registration_number_label: Yup.string()
//     .when('registeredForVAT', {
//       is: true,  // إذا كان مسجلًا في VAT
//       then: Yup.string().required('Tax Registration Number Label is required'),
//       otherwise: Yup.string().notRequired()
//     }),

//   // تحقق من حقل Tax Registration Number (TRN)
//   tax_registration_number: Yup.string()
//     .when('registeredForVAT', {
//       is: true, // تحقق من التسجيل في VAT
//       then: Yup.string().required('Tax Registration Number (TRN) is required'),
//       otherwise: Yup.string().notRequired()
//     }),

//   // تحقق من حقل VAT Registered On
//   vat_registered_on: Yup.date()
//     .when('registeredForVAT', {
//       is: true,  // إذا كان مسجلاً في VAT
//       then: Yup.date().required('VAT Registered On is required'),
//       otherwise: Yup.date().notRequired()
//     }),

//   // تحقق من حقل العملة
//   currency: Yup.string()
//     .when('registeredForVAT', {
//       is: true,  // إذا كان مسجلًا في VAT
//       then: Yup.string().required('Currency is required'),
//       otherwise: Yup.string().notRequired()
//     }),
// });
