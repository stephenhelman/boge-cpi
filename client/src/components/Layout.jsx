import { Outlet } from "react-router-dom";
import Header from "./Static/Header";
import Footer from "./Static/Footer";

const Layout = () => {
  return (
    <>
      {/* <Header /> */}
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
