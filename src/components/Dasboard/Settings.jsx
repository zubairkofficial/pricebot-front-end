import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import toast from "react-hot-toast";

const SettingsPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const email = localStorage.getItem("user_Email");
  
    if (email) {
      setFormData({ ...formData, email });
    }
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('user_Login_Id');
      if (!userId) {
        console.error('User ID not found');
        return;
      }
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/users/${userId}`, formData);
      // Handle success response
      toast.success("Updated successfully.");
      setTimeout(() => {
        navigate('/List'); // or other success action
      }, 2000); // Delay in milliseconds before redirecting
    } catch (error) {
      console.error('Error updating user:', error); // Handle error response
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center"  style={{marginLeft:'100px'}}>
        <div className="col-md-8">
          <div className="card shadow" style={{ backgroundColor: '#fdfdfd', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <div className="card-body">
              <h2 className="card-title text-center mb-4" style={{ fontSize: '24px', fontWeight: '600' }}>Einstellungen</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label" style={{ fontSize: '16px' }}>E-Mail</label>
                  <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required style={{ borderRadius: '5px' }} />
                </div>
                <div className="mb-3 position-relative">
                  <label htmlFor="password" className="form-label" style={{ fontSize: '16px' }}>Neues Passwort</label>
                  <input type={showPassword ? "text" : "password"} className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required style={{ borderRadius: '5px' }} />
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    onClick={togglePasswordVisibility}
                    className="position-absolute end-0 top-50 translate-middle-y me-3"
                    style={{ cursor: "pointer", paddingTop: '30px', fontSize: '20px' }}
                  />
                </div>
                <div className="d-flex justify-content-end">
                  <button type="submit" className="btn" style={{ backgroundColor: '#0056b3', color: 'white', borderRadius: '5px', padding: '10px 20px', fontSize: '13px', fontWeight: '500' }}>Änderungen speichern</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
