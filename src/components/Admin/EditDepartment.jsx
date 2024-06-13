import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-dropdown-select";
import toast from "react-hot-toast";

const statusOptions = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

const EditDepartmentForm = () => {
  const { departmentId } = useParams();
  const navigate = useNavigate();
  const [department, setDepartment] = useState({
    name: "",
    status: "",
    prompt: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchDepartmentDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/departments/${departmentId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch department details");
        }
        const data = await response.json();
        setDepartment({
          name: data.name,
          status: data.status,
          prompt: data.prompt,
        });
      } catch (error) {
        console.error("Error fetching department details:", error);
        setErrorMessage(error.message);
        setShowAlert(true);
      }
    };

    if (departmentId) {
      fetchDepartmentDetails();
    }
  }, [departmentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleStatusChange = (values) => {
    const selectedValue = values.length > 0 ? values[0].value : "";
    setDepartment({ ...department, status: selectedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!department.name || !department.status) {
      setErrorMessage("Abteilungsname und Status sind erforderlich.");
      setShowAlert(true);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/UpdateDepartment/${departmentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: department.name,
            status: department.status,
            prompt: department.prompt,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update department");
      }

      toast.success("Abteilung erfolgreich aktualisiert", {
        duration: 4000,
      });

      navigate("/Department");
    } catch (error) {
      console.error("Error updating department:", error.message);
      setErrorMessage(error.message);
      toast.error("Failed to update department.");
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
          <div className="p-4 rounded-3 shadow" style={{ backgroundColor: "transparent" }}>
            <form onSubmit={handleSubmit}>
              <h2 className="mb-4">Abteilungen bearbeiten</h2>
              {showAlert && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  {errorMessage}
                  <button type="button" className="btn-close" onClick={handleCloseAlert}></button>
                </div>
              )}
              <div className="mb-3">
                <label htmlFor="nameInput" className="form-label">
                  Name der Abteilungen
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nameInput"
                  name="name"
                  value={department.name}
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
                  value={department.prompt}
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
                  options={statusOptions}
                  values={statusOptions.filter(option => option.value === department.status)}
                  onChange={handleStatusChange}
                  placeholder="Status auswählen"
                  className="form-control"
                  name="status"
                  required
                />
              </div>

              <div className="d-flex justify-content-start">
                <button type="submit" className="btn btn-outline-primary">
                  Update-Abteilung
                </button>
                <Link to={`/Department`} className="btn btn-outline-danger ms-2">
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

export default EditDepartmentForm;
