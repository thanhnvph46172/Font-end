import * as yup from "yup";

export const productSchema = yup.object({
  name: yup
    .string()
    .min(4, "4 characters are required")
    .max(12, "12 characters are required")
    .required("name is required"),
  title: yup
    .string()
    .min(10, "10 characters are required")
    .max(20, "20 characters are required")
    .required("title is required"),
  description: yup
    .string()
    .min(24, "24 characters are required")
    .required("description is required"),
  price: yup.number().required("price is required"),
  color: yup
    .string()
    .min(2, "2 characters are required")
    .required("color is required"),
  category: yup
    .string()
    .min(2, "2 characters are required")
    .required("category is required"),
  brand: yup
    .string()
    .min(2, "2 characters are required")
    .required("brand is required"),
  size: yup.string().required("size is required"),
  quantity: yup.number().required("quantity is required"),
});
