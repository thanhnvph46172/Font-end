import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("IT MUST BE AN EMAIL")
    .required("EMAIL IS REQUIRED"),
  password: yup.string().required("PASSWORD IS REQUIRED"),
});
