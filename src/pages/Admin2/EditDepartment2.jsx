import React from "react";
import FileUpload from "../../components/FileUpload/FileUpload";
import Helpers from "../../Helpers/Helpers";
import Loader from "../../components/Loader/Loader";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Offcanvas from "../../components/Offcanvas/Offcanvas";
import { useNavigate } from "react-router-dom";
import Sidebar2 from "../../components/Sidebar/Sidebae2";
import First from "../../components/Dasboard/First";
import Index from "../../components/Admin/Index";
import AddUser from "../../components/Admin/AddUser";
import SideBar from "../../components/Admin/SideBar";
import Edit from "../../components/Admin/Edit";
import ApiSettings from "../../components/Admin/ApiSettings";
import Department from "../../components/Admin/Department";
import EditDepartment from "../../components/Admin/EditDepartment";

const Index2 = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    console.log("scripts are loading");
    Helpers.loadScript("assets/js/plugins/apexcharts.min.js")
      .then(() => Helpers.loadScript("assets/js/pages/dashboard-default.js"))
      .then(() => Helpers.loadScript("assets/js/plugins/popper.min.js"))
      .then(() => Helpers.loadScript("assets/js/plugins/simplebar.min.js"))
      .then(() => Helpers.loadScript("assets/js/plugins/bootstrap.min.js"))
      .then(() => Helpers.loadScript("assets/js/pcoded.js"))
      .then(() => Helpers.loadScript("assets/js/plugins/feather.min.js"))
      .catch((error) => console.error("Script loading failed: ", error));
  }, []);

  // React.useEffect(() => {
  //   const role = localStorage.getItem("role");
  //   if (role === "1") {
  //     navigate('/Edit_Department/{id}');
  //   } else {
  //     navigate('/Admin-Login');
  //   }
  // }, [navigate]);

  return (
    <>
      <body
        data-pc-preset="preset-1"
        data-pc-sidebar-caption="true"
        data-pc-direction="ltr"
        data-pc-theme_contrast=""
        data-pc-theme="light"
      >
        <Loader />
        {/* <!-- [ Sidebar Menu ] start --> */}
        <SideBar />
        {/* <!-- [ Sidebar Menu ] end --> <!-- [ Header Topbar ] start --> */}
        {/* <Header /> */}
        <EditDepartment />

        <Footer />
        <Offcanvas />
      </body>
    </>
  );
};

export default Index2;
