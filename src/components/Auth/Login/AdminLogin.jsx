import React, { useState } from "react";
import logo from "/assets/logo.jpeg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleData = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const resp = await axios.post(
        `${import.meta.env.VITE_API_URL}/AdminLogin`,
        data
      );
      // console.log("login user", resp);
        // Store user data in local storage
        // localStorage.setItem("user_Login_Id", resp?.data?.user?.id);
        // localStorage.setItem("user_Name", resp?.data?.user?.name);
        // localStorage.setItem("user_Email", resp?.data?.user?.email);
        localStorage.setItem("role", resp?.data?.user?.role);
        // localStorage.setItem("user_Services", JSON.stringify(resp?.data?.user?.services));
      toast.success(resp?.data?.message);
      navigate("/Admin");
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log("error while user login", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <>
      <div class="auth-main">
        <div class="auth-wrapper v1">
          <div class="auth-form">
            <div class="card my-5">
              <div class="card-body">
                <h1
                  className="text-center"
                  style={{ textAlign: "center", marginTop: "1px" }}
                >
                  Admin-Login
                </h1>
                <div
                  class="text-center"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <a href="#">
                    {/* <img
                      style={{ height: "100px", width: "100px" }}
                      src={logo}
                      alt="img"
                    /> */}
                  </a>
                  <div class="d-grid my-3"></div>
                </div>
                <h4
                  style={{ textAlign: "center", margin: "20px 0" }}
                  class="text-center f-w-500 mb-3"
                >
                  Melden Sie sich mit Ihrer E-Mail an
                </h4>
                <div className="form-group mb-3">
                  <input
                    onChange={handleData}
                    onKeyPress={handleKeyPress}
                    name="email"
                    value={data.email}
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="E-Mail-Adresse"
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    onChange={handleData}
                    onKeyPress={handleKeyPress}
                    value={data.password}
                    name="password"
                    type="password"
                    className="form-control"
                    id="floatingInput1"
                    placeholder="Passwort"
                  />
                </div>

                <div className="d-grid mt-4">
                  <button
                    onClick={handleSubmit}
                    style={{
                      width: "100%",
                      margin: "20px 0",
                      background: "#019645",
                    }}
                    type="button"
                    className="btn btn-primary"
                  >
                    Anmeldung
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
