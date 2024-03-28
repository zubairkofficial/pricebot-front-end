import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const UserTable = () => {
  // Dummy user data
  const users = [
    { name: 'John Doe', email: 'john@example.com', service: 'Service 1', role: 'Admin' },
    { name: 'Jane Smith', email: 'jane@example.com', service: 'Service 2', role: 'User' },
    { name: 'Alice Johnson', email: 'alice@example.com', service: 'Service 3', role: 'Admin' },
  ];

  // State for pagination (example with 5 items per page)
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  // Calculate pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Placeholder functions for edit and delete actions
  const handleEdit = (index) => {
    console.log('Editing user at index:', index);
  };

  const handleDelete = (index) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this user?');
    if (isConfirmed) {
      console.log('Deleting user at index:', index);
    }
  };

  // Get location state for alert message
  const location = useLocation();
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    if (location.state && location.state.alertMessage) {
      setAlertMessage(location.state.alertMessage);
      setTimeout(() => {
        setAlertMessage('');
      }, 3000);
    }
  }, [location.state]);

  return (
    <div className="container mt-5">
     
      <h1 className="mb-4 text-dark text-center">User List</h1>
      <div className="row">
        <div className="col-md-2">
        </div>
        <div className="col-md-10">
          <div className="d-flex justify-content-end mb-3">
            <Link to="/AddUser">
              <button className="btn btn-primary">Add User</button>
            </Link>
          </div>
          <div className="table-responsive">
            <table className="table table-bordered table-hover shadow-sm">
              <thead className="table-primary">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Service</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.service}</td>
                    <td>
                      <span className={`badge ${user.role === 'Admin' ? 'bg-danger' : 'bg-info'}`}>{user.role}</span>
                    </td>
                    <td>
                      <button className="btn btn-outline-secondary me-2" onClick={() => handleEdit(index)}>Edit</button>
                      <button className="btn btn-outline-danger" onClick={() => handleDelete(index)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination here if necessary */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
