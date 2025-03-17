import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { baseApi } from "../../../../environment";

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    imgUrl: PropTypes.string,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }),
};

export default function ProductCard({ product }) {
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
    <Card
      style={{
        maxWidth: 345,
        margin: "auto",
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="340"
          image={product.imgUrl || "https://via.placeholder.com/340"}
          alt={product.name}
          style={{ objectFit: "cover" }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            style={{ fontWeight: "bold" }}
          >
            {product.name}
          </Typography>
          <Typography variant="body2" style={{ color: "gray" }}>
            {product.title}
          </Typography>

          <Typography variant="body2" style={{ color: "gray" }}>
            {product.price}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions style={{ justifyContent: "center", padding: "8px 16px" }}>
        <Button
          size="small"
          variant="contained"
          color="primary"
          component={Link}
          to={`/product-details?product_id=${product._id}`}
          style={{ textTransform: "none", fontWeight: "bold" }}
        >
          View Details
        </Button>
        <Button
          size="small"
          variant="contained"
          color="primary"
          component={Link}
          style={{ textTransform: "none", fontWeight: "bold" }}
          onClick={() => addToCart(product._id)}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}
