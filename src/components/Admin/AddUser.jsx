import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-dropdown-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

const myData = [
  { label: "Preisbot", value: "Preisbot" },
  { label: "Protokoll", value: "Protokoll" },
  { label: "Preishistorie", value: "Preishistorie" },
  { label: "Finde Lieferscheine mit", value: "Finde Lieferscheine mit" },
  { label: "Datenanalyse", value: "Datenanalyse" },
];

const AddUserForm = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    showPassword: false,
    services: [],
    roles: [],
    departments: [],
    prompt: ""
  });
  const [departments, setDepartments] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showAdditionalInputs, setShowAdditionalInputs] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      try { 
        const response = await fetch(`${import.meta.env.VITE_API_URL}/GetDepartments`);
        if (!response.ok) {
          throw new Error("Failed to fetch departments");
        }
        const data = await response.json();
        setDepartments(data.map(dept => ({ label: dept.name, value: dept.name, prompt: dept.prompt }))); // Include prompt in the department data
      } catch (error) {
        console.error("Error fetching departments:", error.message);
      }
    };

    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleServiceChange = (values) => {
    const selectedValues = values.map((option) => option.value);
    setUser({ ...user, services: selectedValues });
    setShowAdditionalInputs(selectedValues.includes("Protokoll"));
  };

  const handleDepartmentChange = (values) => {
    const selectedValues = values.map((option) => option.value);
    const selectedPrompts = values.map((option) => option.prompt).join("\n\n");
    setUser({ ...user, departments: selectedValues, prompt: selectedPrompts });
  };

  const togglePasswordVisibility = () => {
    setUser({ ...user, showPassword: !user.showPassword });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.name || !user.email || !user.password ) {
      setErrorMessage("Name, email, password, and at least one department are required.");
      setShowAlert(true);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          password: user.password,
          services: user.services,
          roles: user.roles,
          departments: user.departments,
          prompt: user.prompt
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to register user");
      }

      // Reset form fields
      setUser({
        name: "",
        email: "",
        password: "",
        showPassword: false,
        services: [],
        roles: [],
        departments: [],
        prompt: ""
      });

      setErrorMessage("");
      setShowAlert(false);

      // Show success toast
      toast.success("User registered successfully", {
        duration: 4000, // Duration of the toast
      });

      setTimeout(() => {
        navigate("/Admin");
      }, 2000);
    } catch (error) {
      console.error("Error registering user:", error.message);
      setErrorMessage("Failed to register user.");
      setShowAlert(true);

      toast.error("Failed to register user.");
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    setErrorMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="container p-4 rounded shadow-sm bg-light">
      <h2 className="mb-4">Benutzer hinzufügen</h2>
      {showAlert && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
          <button type="button" className="btn-close" onClick={handleCloseAlert}></button>
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
        <label htmlFor="emailInput" className="form-label">
          E-Mail
        </label>
        <input
          type="email"
          className="form-control"
          id="emailInput"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="passwordInput" className="form-label d-flex align-items-center">
          Passwort
          <span className="ms-auto" onClick={togglePasswordVisibility}>
            <FontAwesomeIcon icon={user.showPassword ? faEyeSlash : faEye} />
          </span>
        </label>
        <input
          type={user.showPassword ? "text" : "password"}
          className="form-control"
          id="passwordInput"
          name="password"
          value={user.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="serviceSelect" className="form-label">
          Dienste
        </label>
        <Select
          options={myData}
          onChange={handleServiceChange}
          multi
          placeholder="Dienste auswählen"
          className="form-control"
          name="services"
          required
        />
      </div>
      {showAdditionalInputs && (
        <>
          <div className="mb-3">
            <label htmlFor="departmentSelect" className="form-label">
              Abteilung
            </label>
            <Select
              options={departments}
              onChange={handleDepartmentChange}
              multi
              placeholder="Abteilung auswählen"
              className="form-control"
              name="departments"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="promptInput" className="form-label">
              Prompt
            </label>
            <textarea
              className="form-control"
              id="promptInput"
              name="prompt"
              value={user.prompt}
              readOnly
              rows="4"
            ></textarea>
          </div>
        </>
      )}
      <button type="submit" className="btn btn-outline-primary">
        Benutzer hinzufügen
      </button>
      <Link to={`/Admin`} className="btn btn-outline-danger ms-2">
        Abbrechen
      </Link>
    </form>
  );
};

const AdminPanel = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">{/* Sidebar content */}</div>
        </div>
        <div className="col-md-7">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <AddUserForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
