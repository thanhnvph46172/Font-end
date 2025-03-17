import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { baseApi } from "../../../environment";
import { Button } from "@mui/material";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);

  const fetchSingleProduct = (productId) => {
    axios
      .get(`${baseApi}/product/one/${productId}`)
      .then((res) => {
        setProduct(res.data.singleData);
      })
      .catch((e) => {
        console.log("error", e);
      });
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const productId = urlParams.get("product_id");
    fetchSingleProduct(productId);
  }, []);
  const addToCart = (productId) => {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage

    axios
      .post(
        `${baseApi}/cart/create`,
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } } // Thêm header Authorization
      )

      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log("error", e);
      });
  };
  return (
    <div style={{ padding: "30px" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 4, color: "#333" }}
      >
        Product Details
      </Typography>
      <Grid container spacing={4} sx={{ minHeight: "500px" }}>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <img
            style={{
              height: "350px",
              maxWidth: "100%",
              objectFit: "contain",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            }}
            alt={product?.name || "Product Image"}
            src={`/public/${product?.imgUrl || "placeholder.jpg"}`}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {product && (
            <TableContainer
              component={Paper}
              elevation={3}
              sx={{ padding: "20px", borderRadius: "8px" }}
            >
              <Table aria-label="product details table">
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", color: "#555" }}>
                      Name
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", color: "#555" }}>
                      Title
                    </TableCell>
                    <TableCell>{product.title}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", color: "#555" }}>
                      Brand
                    </TableCell>
                    <TableCell>{product.brand}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", color: "#555" }}>
                      Price
                    </TableCell>
                    <TableCell>{`$${product.price}`}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", color: "#555" }}>
                      Color
                    </TableCell>
                    <TableCell>{product.color}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", color: "#555" }}>
                      Description
                    </TableCell>
                    <TableCell>{product.description}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{ fontWeight: "bold", color: "#555" }}
                    ></TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        style={{ textTransform: "none", fontWeight: "bold" }}
                        onClick={() => addToCart(product._id)}
                      >
                        Add to cart
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductDetail;
