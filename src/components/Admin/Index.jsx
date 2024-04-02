import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import toast from "react-hot-toast";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [alertMessage, setAlertMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);
  const { roleId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();

    if (location.state && location.state.alertMessage) {
      setAlertMessage(location.state.alertMessage);
      setTimeout(() => {
        setAlertMessage("");
      }, 3000);
    }
  }, [location.state]);
  // useEffect(() => {
  //   setAlertMessage("");
  // }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/getRoles`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setUsers(data.roles);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  const handleDelete = (roleId) => {
    setRoleToDelete(roleId);
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/deleteRole/${roleToDelete}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete role");
      }
      setUsers((prevRoles) =>
        prevRoles.filter((role) => role.id !== roleToDelete)
      );
      toast.success("Role deleted successfully.");
    } catch (error) {
      console.error("Error deleting role:", error.message);
      toast.error("Failed to delete role.");
    }
    setShowConfirmation(false);
    setTimeout(() => {
      setAlertMessage("");
    }, 5000);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleEdit = (roleId) => {
    // Any pre-navigation logic can go here
    navigate(`/Edit/${roleId}`);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center" style={{ fontWeight: "bold", color: "#333" }}>
        Benutzerliste
      </h2>
      <div className="row">
        <div className="col-md-2">
          {/* Sidebar content goes here (if any) */}
        </div>
        <div className="col-md-10">
          <div className="d-flex justify-content-end mb-3">
            <div>
              <Link to="/AddUser" className="btn btn-success">
                + Benutzer hinzufügen
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
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead style={{ backgroundColor: "", color: "white" }}>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Dienst</th>
                      <th scope="col">Aktionen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.services.join(", ")}</td>
                        <td>
                          <button
                            className="btn btn-primary btn-sm me-2"
                            onClick={() => handleEdit(user.id)}
                            title="Editieren"
                          >
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(user.id)}
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
              Sind Sie sicher, dass Sie diese Rolle löschen möchten?
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowConfirmation(false)}
              >
                Abbrechen
              </Button>
              <Button variant="danger" onClick={confirmDelete}>
                Löschen
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
