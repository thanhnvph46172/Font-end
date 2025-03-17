import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { useFormik } from "formik";
import { loginSchema } from "../../../yup/loginSchema";
import axios from "axios";
import { baseApi } from "../../../environment";
import Swal from "sweetalert2";
const Login = () => {
  const nav = useNavigate();
  const initialValues = { email: "", password: "" };
  const Formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit: (value) => {
      console.log("value", value);
      axios
        .post(`${baseApi}/user/login`, {
          email: value.email,
          password: value.password,
        })
        .then((res) => {
          console.log(res);
          const token = res.data.token;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(res.data.user));

          Swal.fire({
            icon: "success",
            title: "Success",
            text: res.data.message,
            confirmButtonText: "OK",
          }).then(() => {
            nav("/");
          });
        })
        .catch((e) => {
          console.log(e);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Login failed. Please try again.",
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
        <Typography variant="h4">Login</Typography>
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
        <Button type="submit" sx={{ marginTop: "20px" }} variant="contained">
          Submit
        </Button>
        <Link to={"/register"}> Do not have an account? Register</Link>
      </Box>
    </div>
  );
};

export default Login;
