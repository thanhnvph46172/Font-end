import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  Grid,
  Avatar,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";
import { baseApi } from "../../../environment";

const Checkout = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${baseApi}/order/create`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrderDetails(response.data.order);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Có lỗi xảy ra khi lấy thông tin đơn hàng.");
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, []);

  const handleCheckout = () => {
    console.log("Proceeding to payment...");
  };

  if (loading) {
    return (
      <Container
        sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}
      >
        <CircularProgress color="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ marginTop: 4 }}>
        <Alert severity="error" variant="outlined" align="center">
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ marginTop: 4 }}>
      <Box sx={{ backgroundColor: "#f5f5f5", padding: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom align="center" color="primary">
          Thanh Toán
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{ padding: 3, boxShadow: 3, backgroundColor: "#ffffff" }}
            >
              <Box display="flex" alignItems="center" marginBottom={2}>
                <Avatar
                  alt="User Avatar"
                  src={orderDetails.user.avatar || "/default-avatar.png"}
                  sx={{ width: 80, height: 80, marginRight: 2 }}
                />
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {orderDetails.user.firstName +
                      " " +
                      orderDetails.user.lastName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {orderDetails.user.email}
                  </Typography>
                </Box>
              </Box>
              <TextField
                label="Email"
                fullWidth
                value={orderDetails.user.email || ""}
                margin="normal"
                disabled
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              sx={{ padding: 3, boxShadow: 3, backgroundColor: "#ffffff" }}
            >
              <Typography variant="h6" marginBottom={2} color="primary">
                Thông tin giao hàng
              </Typography>
              <TextField
                label="Tên người nhận"
                fullWidth
                value={orderDetails.shippingAddress.username || ""}
                margin="normal"
                disabled
              />
              <TextField
                label="Địa chỉ"
                fullWidth
                value={`${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.country}`}
                margin="normal"
                disabled
              />
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h5" gutterBottom color="primary">
            Các Sản Phẩm
          </Typography>
          <Grid container spacing={2}>
            {orderDetails.itemArr.map((item, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper
                  sx={{ padding: 2, boxShadow: 2, backgroundColor: "#ffffff" }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        <img
                          src={item.product.imgUrl || "/default-product.png"}
                          alt={item.product.name}
                          style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "contain",
                            borderRadius: "8px",
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="h6" noWrap>
                        {item.product.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ marginBottom: 1 }}
                      >
                        {item.product.description}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="primary"
                        sx={{ fontWeight: "bold" }}
                      >
                        {item.product.price * item.quantity} VND
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Số lượng: {item.quantity}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ marginTop: 4, display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleCheckout}
            sx={{ paddingX: 4, paddingY: 1.5 }}
          >
            Thanh Toán
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Checkout;
