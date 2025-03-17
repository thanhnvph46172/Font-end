// username: "",
//     phone: "",
//     pin: "",
//     landmark: "",
//     city: "",
//     state: "",
//     country: "",

import * as yup from "yup";

export const addressSchema = yup.object({
  username: yup.string().min(4).required(),
  phone: yup.string().required().min(10),
  pin: yup.string().required().min(5),
  state: yup.string().required().min(5),
  country: yup.string().required().min(3),
});
