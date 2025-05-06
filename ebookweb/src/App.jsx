
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Home";
import MainLayout from "./Layouts/mainLayout";
import AboutUs from "./Pages/aboutUs";
import MyProfile from "./Pages/myProfile";
import ErrorPage from "./Pages/errorPage";
import Shop from "./Pages/shop";
import ShopDetail from "./Pages/shopDetail";
import Cart from "./pages/cart";
import ContactUs from "./Pages/contactUs";
import Login from "./Pages/login";
import Register from "./Pages/registration";
import MyBook from "./Pages/myBook";
import TruyenWrapper from './Pages/TruyenWrapper';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<ShopDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mybook" element={<MyBook />} />

        <Route path="/read/:bookId" element={<TruyenWrapper />} />
      </Route>
      <Route path="/error" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
