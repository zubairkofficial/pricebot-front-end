import React from "react";
import logo from "/assets/logo.jpeg";
import axios from "axios";
const Register = () => {
  const [data, setData] = React.useState({
    name: "",
    password: "",
    email: "",
  });
  const handleData = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitData = async () => {
    try {
      const resp = await axios.post(
        `${import.meta.env.VITE_API_URL}/register`,
        data
      );
      console.log("user register", resp.data);
      localStorage.setItem("userToken", resp.data.token);
    } catch (error) {
      console.log("error while registration", error);
    }
  };

  return (
    <>
      <div class="auth-main">
        <div class="auth-wrapper v1">
          <div class="auth-form">
            <div class="card my-5">
              <div class="card-body">
                <div
                  style={{ display: "flex", justifyContent: "center" }}
                  class="text-center"
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
                  Register with your email
                </h4>
                <div class="form-group mb-3">
                  <input
                    name="name"
                    onChange={handleData}
                    value={data.name}
                    type="text"
                    class="form-control"
                    id="floatingInput"
                    placeholder="Enter full name"
                  />
                </div>
                <div class="form-group mb-3">
                  <input
                    name="email"
                    onChange={handleData}
                    value={data.email}
                    type="email"
                    class="form-control"
                    id="floatingInput"
                    placeholder="Email Address"
                  />
                </div>
                <div class="form-group mb-3">
                  <input
                    name="password"
                    onChange={handleData}
                    value={data.password}
                    type="password"
                    class="form-control"
                    id="floatingInput1"
                    placeholder="Password"
                  />
                </div>

                <div class="d-grid mt-4">
                  <button
                    onClick={submitData}
                    style={{ width: "100%", margin: "20px 0" }}
                    type="button"
                    class="btn btn-primary"
                  >
                    Register
                  </button>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                  class="d-flex justify-content-between align-items-end mt-4"
                >
                  <h6 class="f-w-500 mb-0">Already Have an account</h6>
                  <a href="#" class="link-primary">
                    Login
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
