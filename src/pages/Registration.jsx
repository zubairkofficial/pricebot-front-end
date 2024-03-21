import React from "react";
import Login from "../components/Auth/Login/Login";
import Helpers from "../Helpers/Helpers";
import Register from "../components/Auth/Register/Register";

const Registration = () => {
  const userToken = localStorage.getItem("userToken");

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
  return (
    <>
      {" "}
      <Login />{" "}
    </>
  );
};

export default Registration;
