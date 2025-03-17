import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import View from "./view/View";
import Login from "./view/components/login/Login";
import Admin from "./admin/Admin";
import Dasboard from "./admin/components/dasboard/Dasboard";
import ProductAdmin from "./admin/components/product/ProductAdmin";
import UserAdmin from "./admin/components/user/UserAdmin";
import NotFound from "./view/components/notfound/NotFound";
import Product from "./view/components/product/Product";
import Cart from "./view/components/cart/Cart";
import Register from "./view/components/register/Register";
import HomePage from "./view/components/home/HomePage";
import ProductDetail from "./view/components/product detail/ProductDetail";
import Oder from "./view/components/oder/Oder";
// import OderDetail from "./view/components/oder-details/OderDetail";
import OrderAdmin from "./admin/components/order/OrderAdmin";
import ProductDetailAdmin from "./admin/components/product-details/ProductDetailsAdmin";
import Logout from "./view/components/logout/Logout";
import Address from "./view/components/address/Address";
import Checkout from "./view/components/checkout/Checkout";
// import CheckoutWithAddress from "./view/components/checkout/Checkout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* admin */}
          <Route path="/admin" element={<Admin />}>
            <Route index element={<Dasboard />} />
            <Route path="dashboard" element={<Dasboard />} />
            <Route path="product" element={<ProductAdmin />} />
            <Route path="user" element={<UserAdmin />} />
            <Route path="order" element={<OrderAdmin />} />
            <Route path="product-details" element={<ProductDetailAdmin />} />
          </Route>
          {/* view */}
          <Route path="/" element={<View />}>
            <Route index element={<HomePage />} />
            <Route path="home" element={<HomePage />} />
            <Route path="product" element={<Product />} />
            <Route path="cart" element={<Cart />} />
            <Route path="order" element={<Oder />} />

            <Route path="login" element={<Login />} />
            <Route path="logout" element={<Logout />} />
            <Route path="register" element={<Register />} />
            <Route path="product-details" element={<ProductDetail />} />
            <Route path="address" element={<Address />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
