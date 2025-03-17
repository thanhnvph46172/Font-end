import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { useFormik } from "formik";
import { registerSchema } from "../../../yup/registerSchema";
import axios from "axios";
import { baseApi } from "../../../environment";
import Swal from "sweetalert2";

const Register = () => {
  const nav = useNavigate();
  const initialValues = {
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const Formik = useFormik({
    initialValues: initialValues,
    validationSchema: registerSchema,
    onSubmit: (value) => {
      console.log("value", value);
      axios
        .post(`${baseApi}/user/create`, {
          email: value.email,
          username: value.username,
          password: value.password,
          phone: value.phone,
        })
        .then((res) => {
          console.log(res);
          Swal.fire({
            icon: "success",
            title: "Success",
            text: res.data.message,
            confirmButtonText: "OK",
          }).then(() => {
            nav("/login");
          });
        })
        .catch((e) => {
          console.log("error", e);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Registration failed. Please try again.",
            confirmButtonText: "OK",
          });
        });
    },
  });
  return (
    <div>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "500px",
          margin: "auto",
          minHeight: "400px",
          justifyContent: "center",
          alignItems: "center",
        }}
        onSubmit={Formik.handleSubmit}
      >
        <Typography variant="h4">Register</Typography>
        <TextField
          name="email"
          value={Formik.values.email}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
          fullWidth
          sx={{ marginTop: "20px" }}
          id="outlined-basic"
          label="Email"
          variant="outlined"
        />
        {Formik.errors.email && Formik.touched.email && (
          <Typography sx={{ color: "red" }}>{Formik.errors.email}</Typography>
        )}

        <TextField
          name="username"
          value={Formik.values.username}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
          fullWidth
          sx={{ marginTop: "20px" }}
          id="outlined-basic"
          label="Username"
          variant="outlined"
        />
        {Formik.errors.username && Formik.touched.username && (
          <Typography sx={{ color: "red" }}>
            {Formik.errors.username}
          </Typography>
        )}

        <TextField
          name="phone"
          value={Formik.values.phone}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
          fullWidth
          sx={{ marginTop: "20px" }}
          id="outlined-basic"
          label="Phone"
          variant="outlined"
        />
        {Formik.errors.phone && Formik.touched.phone && (
          <Typography sx={{ color: "red" }}>{Formik.errors.phone}</Typography>
        )}

        <TextField
          name="password"
          value={Formik.values.password}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
          fullWidth
          sx={{ marginTop: "20px" }}
          id="filled-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="filled"
        />
        {Formik.errors.password && Formik.touched.password && (
          <Typography sx={{ color: "red" }}>
            {Formik.errors.password}
          </Typography>
        )}

        <TextField
          name="confirmPassword"
          value={Formik.values.confirmPassword}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
          fullWidth
          sx={{ marginTop: "20px" }}
          id="filled-password-input"
          label="confirmPassword"
          type="password"
          autoComplete="current-password"
          variant="filled"
        />
        {Formik.errors.confirmPassword && Formik.touched.confirmPassword && (
          <Typography sx={{ color: "red" }}>
            {Formik.errors.confirmPassword}
          </Typography>
        )}
        <Button type="submit" sx={{ marginTop: "20px" }} variant="contained">
          Submit
        </Button>
        <Link to={"/login"}> Alreadly have account?Login</Link>
      </Box>
    </div>
  );
};

export default Register;
