import * as yup from "yup";

export const registerSchema = yup.object({
  email: yup
    .string()
    .email("IT MUST BE AN EMAIL")
    .required("EMAIL IS REQUIRED"),
  password: yup.string().required("PASSWORD IS REQUIRED"),
  phone: yup
    .string()
    .required("PHONE IS REQUIRED")
    .min(8, "PASSWORD CONTAIN 8 CHARACTER "),
  username: yup.string().required("USERNAME IS REQUIRED"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "PASSWORD MUST CATCH")
    .required("CONFIRM PASSWORD"),
});
