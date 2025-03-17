import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import React from "react";

export default function Footer() {
  const [value, setValue] = React.useState(0);

  return (
    <Box
      sx={{
        flexGrow: 1,
        background: "linear-gradient(135deg, #007acc, #005fa3)",
        padding: "40px 20px",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <Grid
        container
        spacing={3}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item xs={12} md={4}>
          <h2 style={{ margin: 0 }}>Shop</h2>
          <p style={{ marginTop: "10px" }}>
            Find the best products here with amazing deals!
          </p>
        </Grid>
        <Grid item xs={12} md={4}>
          <h2 style={{ margin: 0 }}>Connect With Us</h2>
          <p style={{ marginTop: "10px" }}>
            Follow us on social media for updates.
          </p>
        </Grid>
        <Grid item xs={12} md={4}>
          <BottomNavigation
            sx={{
              background: "transparent",
              "& .MuiBottomNavigationAction-root": {
                color: "#fff",
                "&:hover": {
                  color: "#f5a623",
                },
              },
            }}
            showLabels
            value={value}
            onChange={(event, newValue) => setValue(newValue)}
          >
            <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
            <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
          </BottomNavigation>
        </Grid>
      </Grid>
      <Box sx={{ mt: 5, textAlign: "center", fontSize: "14px" }}>
        <p style={{ margin: 0 }}>Copyright &copy; 2024 | All Rights Reserved</p>
      </Box>
    </Box>
  );
}
