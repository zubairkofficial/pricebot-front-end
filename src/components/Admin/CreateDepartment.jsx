import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-dropdown-select";
import toast from "react-hot-toast";

const AddUserForm = () => {
  const [user, setUser] = useState({
    name: "",
    status: "",
    prompt: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const customOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleStatusChange = (values) => {
    const selectedValue = values.length > 0 ? values[0].value : "";
    setUser({ ...user, status: selectedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.name || !user.status) {
      setErrorMessage("Abteilungsname und Status sind erforderlich.");
      setShowAlert(true);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/CreateDepartment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.name,
          status: user.status,
          prompt: user.prompt,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create department");
      }

      // Reset form fields
      setUser({
        name: "",
        status: "",
        prompt: "",
      });

      setErrorMessage("");
      setShowAlert(false);

      // Show success toast
      toast.success("Abteilung erfolgreich hinzugefügt", {
        duration: 4000,
      });

      setTimeout(() => {
        navigate("/Department");
      }, 2000);
    } catch (error) {
      console.error("Error creating department:", error.message);
      setErrorMessage(error.message);
      setShowAlert(true);

      toast.error("Failed to create department.");
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    setErrorMessage("");
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      height: '38px',
    }),
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container p-4 rounded shadow-sm bg-light"
    >
      <h2 className="mb-4">Abteilung hinzufügen</h2>
      {showAlert && (
        <div className="alert alert-danger" role="alert">
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
          Abteilungsname
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
        <label htmlFor="promptInput" className="form-label">
          Prompt
        </label>
        <textarea
          className="form-control"
          id="promptInput"
          name="prompt"
          value={user.prompt}
          onChange={handleChange}
          rows="4"
          required
        ></textarea>
      </div>

      <div className="mb-3">
        <label htmlFor="statusSelect" className="form-label">
          Status
        </label>
        <Select
          options={customOptions}
          onChange={handleStatusChange}
          placeholder="Status auswählen"
          className="form-control"
          name="status"
          required
          styles={customStyles}
        />
      </div>

      <button type="submit" className="btn btn-outline-primary btn-sm">
        Abteilung hinzufügen
      </button>
      <Link to={`/Department`} className="btn btn-outline-danger ms-2 btn-sm">
        Abbrechen
      </Link>
 
    </form>
  );
};

const AdminPanel = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-2">
          {/* Sidebar content can go here if needed */}
        </div>
        <div className="col-md-10">
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
