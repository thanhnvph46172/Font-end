import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import ProductCard from "./productcard/ProductCard";
import Box from "@mui/material/Box";
import { TextField, Typography } from "@mui/material";
import axios from "axios";
import { baseApi } from "../../../environment";

const Product = () => {
  const [products, setProducts] = useState([]); // Holds the product list
  const [search, setSearch] = useState(""); // Holds the search query

  // Handle search input
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Fetch products based on search query
  const fetchProducts = () => {
    axios
      .get(`${baseApi}/product/all`, { params: { search } })
      .then((res) => setProducts(res.data.data || []))
      .catch((error) => console.error("Failed to fetch products:", error));
  };

  // Fetch products whenever the search query changes
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <Grid container sx={{ minHeight: "500px" }}>
        {/* Main Content Area for Products */}
        <Grid item xs={12} sx={{ padding: "16px" }}>
          {/* Search Bar */}
          <Box mb={2}>
            <TextField
              fullWidth
              value={search}
              onChange={handleSearch}
              label="Search products..."
              variant="outlined"
            />
          </Box>
          {/* Product List */}
          <Grid container spacing={2}>
            {products.length > 0 ? (
              products.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                  <ProductCard product={product} />
                </Grid>
              ))
            ) : (
              <Typography
                variant="body1"
                color="textSecondary"
                sx={{ margin: "16px" }}
              >
                No products found.
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Product;
