// import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import "./Hero.css"; // Make sure to update the CSS for better styling

export default function Hero() {
  return (
    <Box sx={{ flexGrow: 1, minHeight: "100vh" }}>
      <Grid container spacing={2}>
        {/* Left Side - Hero image with background */}
        <Grid
          sx={{
            height: "100vh",
            backgroundImage:
              "url('https://agilearn.vn/wp-content/uploads/2021/02/ban-hang-chuyen-nghiep-02-1.png')", // Placeholder background image
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            position: "relative",
          }}
          item
          xs={12}
          md={8}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.4)", // Dark overlay for text contrast
            }}
          ></Box>
          <Typography
            variant="h2"
            sx={{
              color: "#fff",
              fontWeight: "bold",
              zIndex: 1,
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
            }}
          >
            Welcome to Our Shop
          </Typography>
          <Button
            href="/product"
            variant="contained"
            color="primary"
            sx={{
              marginTop: 2,
              fontSize: "1.2rem",
              padding: "12px 24px",
              borderRadius: "8px",
              zIndex: 1,
              "&:hover": {
                backgroundColor: "#ff5722", // Orange on hover
              },
            }}
          >
            Shop Now
          </Button>
        </Grid>

        {/* Right Side - Optional Text */}
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: 2,
          }}
          item
          xs={12}
          md={4}
        >
          <Typography
            variant="h4"
            sx={{
              color: "#333",
              fontWeight: "medium",
              textAlign: "center",
              margin: "20px 0",
            }}
          >
            Explore the Best Products for Your Home & Lifestyle
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
