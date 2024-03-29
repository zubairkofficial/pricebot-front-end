import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-dropdown-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const services = [
  { name: 'Preisbot' },
  { name: 'Protokoll' },
  { name: 'Preishistorie' },
];

const roles = ['Admin', 'User'];

const myData = [
  { label: 'Preisbot', value: 'Preisbot' },
  { label: 'Protokoll', value: 'Protokoll' },
  { label: 'Preishistorie', value: 'Preishistorie' },
];

const AddUserForm = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    showPassword: false,
    services: [],
    role: '',
  });
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleServiceChange = (values) => {
    const selectedValues = values.map(option => option.value);
    setUser({ ...user, services: selectedValues });
  };

  const togglePasswordVisibility = () => {
    setUser({ ...user, showPassword: !user.showPassword });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
  
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/Role`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: user.name,
         
          services: user.services,
          
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to register user');
      }
  
      // Reset form fields
      setUser({
        name: '',
       
        services: [],
      
      });
  
      // Reset error message and hide alert
      setErrorMessage('');
      setShowAlert(false);
  
      // Navigate to /Admin with success message
      navigate('/Admin', { state: { alertMessage: 'User registered successfully' } });
    } catch (error) {
      console.error('Error registering user:', error.message);
      setErrorMessage('Failed to register user.');
      setShowAlert(true);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    setErrorMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="container p-4 rounded shadow-sm bg-light">
    <h2 className="mb-4">Rolle und Berechtigungen</h2>
    {showAlert && (
      <div className="alert alert-danger" role="alert">
        {errorMessage}
        <button type="button" className="btn-close" onClick={handleCloseAlert}></button>
      </div>
    )}
    <div className="mb-3">
      <label htmlFor="nameInput" className="form-label">Name</label>
      <input type="text" className="form-control" id="nameInput" name="name" value={user.name} onChange={handleChange} required />
    </div>
    {/* <div className="mb-3">
      <label htmlFor="emailInput" className="form-label">E-Mail</label>
      <input type="email" className="form-control" id="emailInput" name="email" value={user.email} onChange={handleChange} required />
    </div> */}
    {/* <div className="mb-3">
      <label htmlFor="passwordInput" className="form-label d-flex align-items-center">
        Passwort
        <span className="ms-auto" onClick={togglePasswordVisibility}>
          <FontAwesomeIcon icon={user.showPassword ? faEyeSlash : faEye} />
        </span>
      </label>
      <input type={user.showPassword ? 'text' : 'password'} className="form-control" id="passwordInput" name="password" value={user.password} onChange={handleChange} required />
    </div> */}
    <div className="mb-3">
      <label htmlFor="serviceSelect" className="form-label">Dienste</label>
      <Select
        options={myData}
        onChange={handleServiceChange}
        multi
        placeholder="Dienste auswählen"
        className="form-control"
        name='services'
      />
    </div>
    {/* <div className="mb-3">
      <label htmlFor="roleSelect" className="form-label">Benutzerrolle</label>
      <select className="form-select" id="roleSelect" name="role" value={user.role} onChange={handleChange}>
        <option value="">Wählen...</option>
        {roles.map((role, index) => (
          <option key={index} value={role}>{role}</option>
        ))}
      </select>
    </div> */}
    <button type="submit" className="btn btn-outline-primary">  Rolle hinzufügen
 </button>
    <Link to={`/Admin`}  className="btn btn-outline-danger ms-2">Abbrechen</Link>
  </form>  

  );
};

const AdminPanel = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            {/* Sidebar content */}
          </div>
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
