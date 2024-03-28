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
      console.log("login user", resp);
      localStorage.setItem("user_Login_Id", resp?.data?.user?.id);
      toast.success(resp?.data?.message);
      navigate("/Admin");
    } catch (error) {
        toast.error(error?.response?.data?.message);
        console.log("error while user login", error);
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
                    <img
                      style={{ height: "100px", width: "100px" }}
                      src={logo}
                      alt="img"
                    />
                  </a>
                  <div class="d-grid my-3"></div>
                </div>
                <h4
                  style={{ textAlign: "center", margin: "20px 0" }}
                  class="text-center f-w-500 mb-3"
                >
                  Melden Sie sich mit Ihrer E-Mail an
                </h4>
                <div class="form-group mb-3">
                  <input
                    onChange={handleData}
                    name="email"
                    value={data.email}
                    type="email"
                    class="form-control"
                    id="floatingInput"
                    placeholder="E-Mail-Adresse"
                  />
                </div>
                <div class="form-group mb-3">
                  <input
                    onChange={handleData}
                    value={data.password}
                    name="password"
                    type="password"
                    class="form-control"
                    id="floatingInput1"
                    placeholder="Passwort"
                  />
                </div>

                <div class="d-grid mt-4">
                  <button
                    onClick={handleSubmit}
                    style={{
                      width: "100%",
                      margin: "20px 0",
                      background: "#019645",
                    }}
                    type="button"
                    class="btn btn-primary"
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
