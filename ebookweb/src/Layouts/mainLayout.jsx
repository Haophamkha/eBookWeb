import { Outlet } from "react-router-dom";
import Footer from "../Components/footer";
import Header from "../Components/header";
import Navbar from "../Components/navBar";

const MainLayout = () => {
  return (
    <>  
        <Header />
      <Navbar />
      <main className="min-h-screen px-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
