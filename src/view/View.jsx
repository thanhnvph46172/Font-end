import { Outlet } from "react-router-dom";
import TopNavbar from "./uitility components/top navnar/TopNavbar";
import Footer from "./uitility components/footer/Footer";

const View = () => {
  return (
    <>
      {<TopNavbar />}
      {<Outlet />}
      {/* footer */}
      <Footer />
    </>
  );
};

export default View;
