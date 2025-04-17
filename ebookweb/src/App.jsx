import "preline/preline.js";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Home";
import MainLayout from "./Layouts/mainLayout";
import AboutUs from "./pages/aboutUs";
import MyProfile from "./pages/myprofile";
import ErrorPage from "./Pages/errorPage";
import Shop from "./pages/shop";
import ShopDetail from "./pages/shopDetail";
import Cart from "./pages/cart";
import ContactUs from "./pages/contactUs";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shopdetail" element={<ShopDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<ContactUs />} />
      </Route>
    </Routes>
  );
}

export default App;
