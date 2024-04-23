import React from "react";
import FileUpload from "../../components/FileUpload/FileUpload";
import Helpers from "../../Helpers/Helpers";
import Loader from "../../components/Loader/Loader";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Offcanvas from "../../components/Offcanvas/Offcanvas";
import { useNavigate } from "react-router-dom";

import First from '../../components/Dasboard/First';
import Invoice from "../../components/Invoice/Invoice";
import GetData from "../../components/Invoice/GetData";
import History from "../../components/Invoice/History";
import Getdatawithdate from "../../components/Invoice/Getdatawithdate";



const Index = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    // console.log("scripts are loading");
    Helpers.loadScript("assets/js/plugins/apexcharts.min.js")
      .then(() => Helpers.loadScript("assets/js/pages/dashboard-default.js"))
      .then(() => Helpers.loadScript("assets/js/plugins/popper.min.js"))
      .then(() => Helpers.loadScript("assets/js/plugins/simplebar.min.js"))
      .then(() => Helpers.loadScript("assets/js/plugins/bootstrap.min.js"))
      .then(() => Helpers.loadScript("assets/js/pcoded.js"))
      .then(() => Helpers.loadScript("assets/js/plugins/feather.min.js"))
      .catch((error) => console.error("Script loading failed: ", error));
  }, []);

//   React.useEffect(() => {
//     const user_Login_Id = localStorage.getItem("user_Login_Id");
//     if (user_Login_Id) {
//       navigate('/Details-with-date');
//     } else {
//       navigate('/registration');
//     }
//   }, [navigate]);

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
        <Sidebar />
        {/* <!-- [ Sidebar Menu ] end --> <!-- [ Header Topbar ] start --> */}
        {/* <Header /> */}
            <Getdatawithdate
       
        />
        
 
        <Footer />
        <Offcanvas />
      </body>
    </>
  );
};

export default Index;
