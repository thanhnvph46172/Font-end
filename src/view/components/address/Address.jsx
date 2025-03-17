import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  Grid,
  Avatar,
  Paper,
} from "@mui/material";
import axios from "axios";
import { baseApi } from "../../../environment";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { addressSchema } from "../../../yup/addressSchema";

const CheckoutWithAddress = () => {
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [addressSubmitted, setAddressSubmitted] = useState(false);

  // Formik setup for address form
  const formik = useFormik({
    initialValues: {
      username: "",
      phone: "",
      pin: "",
      landmark: "",
      city: "",
      state: "",
      country: "",
    },
    validationSchema: addressSchema,
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `${baseApi}/cart/add-address`,
          values,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        Swal.fire("Success", response.data.message, "success");
        setAddressSubmitted(true); // Set flag for submitted address
        fetchOrderDetails(); // Fetch order details once address is submitted
      } catch (error) {
        Swal.fire(
          "Error",
          "Address submission failed. Please try again.",
          "error",
          console.log(error)
        );
      }
    },
  });

  // Fetch order details after address is submitted
  const fetchOrderDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseApi}/order/create`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrderDetails(response.data.order);
    } catch (error) {
      console.error("Failed to fetch order details:", error);
    }
  };

  // Handle Checkout button click
  const handleCheckout = () => {
    navigate("/payment");
  };

  return (
    <Container>
      {!addressSubmitted ? (
        // Address Form
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
          onSubmit={formik.handleSubmit}
        >
          <Typography variant="h4">Add Shipping Address</Typography>

          {[
            "username",
            "phone",
            "pin",
            "landmark",
            "city",
            "state",
            "country",
          ].map((field) => (
            <Box key={field} sx={{ marginTop: "20px", width: "100%" }}>
              <TextField
                fullWidth
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                name={field}
                variant="outlined"
                value={formik.values[field]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched[field] && Boolean(formik.errors[field])}
                helperText={formik.touched[field] && formik.errors[field]}
              />
            </Box>
          ))}
          <Button type="submit" sx={{ marginTop: "20px" }} variant="contained">
            Submit Address
          </Button>
        </Box>
      ) : orderDetails ? (
        // Order Details
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h4" gutterBottom align="center">
            Checkout
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ padding: 2, boxShadow: 3 }}>
                <Box display="flex" alignItems="center" marginBottom={2}>
                  <Avatar
                    alt="User Avatar"
                    src={orderDetails.user.avatar || "/default-avatar.png"}
                    sx={{ width: 80, height: 80, marginRight: 2 }}
                  />
                  <Box>
                    <Typography variant="h6">
                      {orderDetails.user.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {orderDetails.user.email}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ padding: 2, boxShadow: 3 }}>
                <Typography variant="h6" marginBottom={2}>
                  Shipping Information
                </Typography>
                <Typography>{orderDetails.shippingAddress.username}</Typography>
                <Typography>
                  {orderDetails.shippingAddress.city},{" "}
                  {orderDetails.shippingAddress.country}
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Box sx={{ marginTop: 3 }}>
            <Typography variant="h5" gutterBottom>
              Order Items
            </Typography>
            <Grid container spacing={2}>
              {orderDetails.itemArr.map((item, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Paper sx={{ padding: 2, boxShadow: 2 }}>
                    <Typography variant="h6" noWrap>
                      {item.product.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item.product.description}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="primary"
                      sx={{ marginTop: 1 }}
                    >
                      {item.product.price * item.quantity} VND
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Quantity: {item.quantity}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box sx={{ marginTop: 3, display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleCheckout}
            >
              Checkout
            </Button>
          </Box>
        </Box>
      ) : (
        <Typography variant="h6" color="primary" align="center">
          Loading order details...
        </Typography>
      )}
    </Container>
  );
};

export default CheckoutWithAddress;
