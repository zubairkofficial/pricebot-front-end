import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-dropdown-select";
import toast from "react-hot-toast";

const myData = [
  { label: "Preisbot", value: "Preisbot" },
  { label: "Protokoll", value: "Protokoll" },
  { label: "Preishistorie", value: "Preishistorie" },
  { label: "Finde Lieferscheine mit", value: "Finde Lieferscheine mit" },
];

const EditUserForm = () => {
  const { roleId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    services: [],
  });
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/UserId/${roleId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }
        const data = await response.json();
        setUser({
          name: data.name,
          services: data.services.map((serviceName) =>
            myData.find((service) => service.value === serviceName)
          ),
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
        setErrorMessage(error.message);
        setShowAlert(true);
      }
    };

    if (roleId) {
      fetchUserDetails();
    }
  }, [roleId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleServiceChange = (values) => {
    setUser({ ...user, services: values });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/editRole/${roleId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: user.name,
            services: user.services.map((service) => service.value),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

  
      toast.success("User updated successfully", {
        duration: 2000, 
      });

      
      setTimeout(() => {
        navigate("/Admin"); 
      }, 2000); 
    } catch (error) {
      console.error("Error updating user:", error.message);
   
      toast.error(`Failed to update user: ${error.message}`, {
        duration: 2000, 
      });
      setErrorMessage(error.message);
      setShowAlert(true);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    setErrorMessage("");
  };

  return (
    <div className="container my-5 py-3">
      <div className="row">
        <div className="col-md-2">{/* Sidebar content placeholder */}</div>
        <div className="col-md-10">
          <div
            className=" p-4 rounded-3 shadow "
            style={{ backgroundColor: "transparent" }}
          >
            <form onSubmit={handleSubmit}>
              <h2 className="mb-4">Edit Role</h2>
              {showAlert && (
                <div
                  className="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  {errorMessage}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCloseAlert}
                  ></button>
                </div>
              )}
              <div className="mb-3">
                <label htmlFor="nameInput" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nameInput"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="serviceSelect" className="form-label">
                  Services
                </label>
                <Select
                  options={myData}
                  values={user.services}
                  onChange={handleServiceChange}
                  multi
                  placeholder="Select services"
                  className="form-control"
                  name="services"
                />
              </div>
              <div className="d-flex justify-content-start">
                <button type="submit" className="btn btn-outline-primary">
                  Benutzer aktualisieren
                </button>
                <Link to={`/Admin`} className="btn btn-outline-danger ms-2">
                  Stornieren
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserForm;
