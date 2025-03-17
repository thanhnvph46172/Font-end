import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";

ProductCardAdmin.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    imgUrl: PropTypes.string,
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  productHandleDelete: PropTypes.func.isRequired,
  productHandleEdit: PropTypes.func.isRequired,
};

export default function ProductCardAdmin({
  product,
  productHandleDelete,
  productHandleEdit,
}) {
  return (
    <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
      <Card
        sx={{
          maxWidth: 345,
          boxShadow: 3,
          borderRadius: 2,
          overflow: "hidden",
          m: 1,
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={`/public/${product.imgUrl}`}
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontWeight: "bold", color: "#333" }}
          >
            {product.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "14px" }}
          >
            {product.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 1,
              fontSize: "12px",
              maxHeight: "3em",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {product.description}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center", mb: 1 }}>
          <Button
            size="small"
            variant="contained"
            sx={{
              color: "white",
              backgroundColor: "#2196f3",
              mr: 1,
              ":hover": { backgroundColor: "#1e88e5" },
            }}
          >
            <Link
              to={`/admin/product-details?product_id=${product._id}`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Detail
            </Link>
          </Button>
          <Button
            size="small"
            variant="contained"
            sx={{
              color: "white",
              backgroundColor: "#4caf50",
              mr: 1,
              ":hover": { backgroundColor: "#43a047" },
            }}
            onClick={() => productHandleEdit(product._id)}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            sx={{
              color: "white",
              backgroundColor: "#f44336",
              ":hover": { backgroundColor: "#e53935" },
            }}
            onClick={() => productHandleDelete(product._id)}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
