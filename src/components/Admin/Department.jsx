import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import toast from "react-hot-toast";

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [alertMessage, setAlertMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState(null);
  const [showUsageModal, setShowUsageModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [pricePerToken, setPricePerToken] = useState(0);
  const { departmentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDepartments();

    if (location.state && location.state.alertMessage) {
      setAlertMessage(location.state.alertMessage);
      setTimeout(() => {
        setAlertMessage("");
      }, 3000);
    }
  }, [location.state]);

  const fetchDepartments = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/GetDepartments`);
      if (!response.ok) {
        throw new Error("Failed to fetch departments data");
      }
      const data = await response.json();


      setDepartments(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching departments data:", error.message);
    }
  };

  const handleDelete = (departmentId) => {
    setDepartmentToDelete(departmentId);
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/deleteDepartment/${departmentToDelete}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete department");
      }
      setDepartments((prevDepartments) =>
        prevDepartments.filter((department) => department.id !== departmentToDelete)
      );
      toast.success("Department deleted successfully.");
    } catch (error) {
      console.error("Error deleting department:", error.message);
      toast.error("Failed to delete department.");
    }
    setShowConfirmation(false);
    setTimeout(() => {
      setAlertMessage("");
    }, 5000);
  };

  const handleEdit = (departmentId) => {
    navigate(`/Edit_Department/${departmentId}`);
  };

  const handleShowUsage = (department) => {
    setSelectedDepartment(department);
    setShowUsageModal(true);
  };

  const handleCloseUsageModal = () => {
    setShowUsageModal(false);
    setSelectedDepartment(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center" style={{ fontWeight: "bold", color: "#333" }}>
        Abteilungen
      </h2>
      <div className="row">
        <div className="col-md-2">
          {/* Sidebar content goes here (if any) */}
        </div>
        <div className="col-md-10">
          <div className="d-flex justify-content-end mb-3">
            <div>
              <Link to="/Create_Department" className="btn btn-success">
                + Abteilung hinzufügen
              </Link>
            </div>
          </div>
          {alertMessage && (
            <div className="alert alert-success" role="alert">
              {alertMessage}
            </div>
          )}
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="table-responsive" style={{ overflowX: "auto" }}>
                <table className="table table-hover mb-0">
                  <thead style={{ color: "white" }}>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Abteilungsname</th>
                      <th scope="col">Prompt</th>
                      <th scope="col">Aktionen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departments.map((department, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <span className={`badge rounded-pill ${department.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                            {department.status}
                          </span>
                        </td>
                        <td>{department.name}</td>
                        <td>{department.prompt}</td>
                        <td>
                          <button
                            className="btn btn-primary btn-sm me-2"
                            onClick={() => handleEdit(department.id)}
                            title="Editieren"
                          >
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          <button
                            className="btn btn-danger btn-sm me-2"
                            onClick={() => handleDelete(department.id)}
                            title="Löschen"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* Pagination Placeholder - Implement pagination logic */}

          {/* Confirmation Modal */}
          <Modal
            show={showConfirmation}
            onHide={() => setShowConfirmation(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Bestätigung der Löschung</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Sind Sie sicher, dass Sie diese Abteilung löschen möchten?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
                Abbrechen
              </Button>
              <Button variant="danger" onClick={confirmDelete}>
                Löschen
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Usage Modal */}
        </div>
      </div>
    </div>
  );
};

export default Department;
