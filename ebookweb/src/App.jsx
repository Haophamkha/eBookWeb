import "preline/preline.js";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Home";
import MainLayout from "./Layouts/mainLayout";
// import AboutPage from "./pages/AboutPage";
// import ServicesPage from "./pages/ServicesPage";
// import ContactPage from "./pages/ContactPage";
function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
