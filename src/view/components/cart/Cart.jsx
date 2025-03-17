import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { baseApi } from "../../../environment";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const calculateGrandTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const fetchCartByUser = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`${baseApi}/cart/user-cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const fetchedCartItems = res.data.data.cartItemArr || [];
        setCartItems(fetchedCartItems);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  };

  const updateQuantity = (productId, amount) => {
    if (!productId || amount === undefined) {
      console.log("Invalid productId or amount", productId, amount);
      return; // Ngừng nếu có giá trị không hợp lệ
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product._id === productId
          ? { ...item, quantity: item.quantity + amount }
          : item
      )
    );

    const token = localStorage.getItem("token");
    axios
      .put(
        `${baseApi}/cart/update-cart/${productId}`, // Sửa URL cho đúng với tuyến đường
        { productId, amount }, // Gửi dữ liệu đúng định dạng
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Quantity updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating quantity:", error);
      });
  };

  const incrementQuantity = (productId) => {
    updateQuantity(productId, 1);
  };

  const decrementQuantity = (productId) => {
    updateQuantity(productId, -1);
  };

  const deleteProduct = (productId) => {
    if (confirm("Delete this item from the cart?")) {
      const token = localStorage.getItem("token");
      axios
        .delete(`${baseApi}/cart/delete/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => fetchCartByUser())
        .catch((error) => console.error("Error deleting item:", error));
    }
    location.reload();
  };

  useEffect(() => {
    fetchCartByUser();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="cart table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Image</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems.map((item) => (
            <TableRow key={item._id}>
              <TableCell component="th" scope="row">
                {item.product?.name}
              </TableCell>
              <TableCell align="right">
                <img
                  src={item.product?.imgUrl}
                  alt="Product"
                  style={{ width: 50 }}
                />
              </TableCell>
              <TableCell align="right">{item.product?.price}</TableCell>
              <TableCell align="right">
                <Button
                  onClick={() => decrementQuantity(item.product._id)}
                  disabled={item.quantity <= 1}
                >
                  -
                </Button>
                {item.quantity}
                <Button onClick={() => incrementQuantity(item.product._id)}>
                  +
                </Button>
              </TableCell>
              <TableCell align="right">
                {item.quantity * item.product.price}
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => deleteProduct(item.product._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={4} align="right">
              Grand Total:
            </TableCell>
            <TableCell align="right">{calculateGrandTotal()}</TableCell>
          </TableRow>
          <TableCell colSpan={4} align="right">
            <Button variant="contained">
              <Link
                to="/address"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Process to Oder
              </Link>
            </Button>
          </TableCell>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
