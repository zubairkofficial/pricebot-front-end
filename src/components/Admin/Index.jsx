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
    toast.success('Role deleted successfully.');
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
      <h1 className="mb-4 text-dark text-center">Benutzerliste
</h1>
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-10">
          <div className="d-flex justify-content-end mb-3">
            <Link to="/AddUser">
              <button className="btn btn-primary">Benutzer hinzufügen
</button>
            </Link>
          </div>
          {alertMessage && (
            <div className="alert alert-success" role="alert">
              {alertMessage}
            </div>
          )}
          <div className="table-responsive">
            <table className="table table-bordered table-hover shadow-sm">
              <thead className="table-primary">
                <tr>
                <th>Sr#</th>
                  <th>Name</th>
                  <th>Dienst</th>
                  <th>Aktionen</th>
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
                      className="btn btn-outline-secondary me-2"
                      onClick={() => handleEdit(user.id)} // Ensure you are using the correct user identifier
                    >
                      Edit
                    </button>

                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Confirmation Modal */}
            <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Confirm Deletion</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to delete this role?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={confirmDelete}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
            {/* Pagination here if necessary */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
