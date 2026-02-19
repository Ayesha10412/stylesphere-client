import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../pages/shared/NavBar/Navbar";
import Footer from "../pages/shared/Footer/Footer";

function Main() {
  const location = useLocation();
  console.log("Current path:", location.pathname);
  const noHeaderFooter =
    location.pathname.includes("login") ||
    location.pathname.includes ("signup");
  return (
    <div>
      {noHeaderFooter || <Navbar></Navbar>}
      <div>
        <Outlet></Outlet>
      </div>
      {noHeaderFooter || <Footer></Footer>}
    </div>
  );
}

export default Main;
