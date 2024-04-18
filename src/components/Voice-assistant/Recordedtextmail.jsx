import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function TranscriptionForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [combinedText, setCombinedText] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  
  // Initialize form fields with values from location state
  useEffect(() => {
    if (location.state) {
      setName(location.state.name || '');
      setTitle(location.state.title || '');
      setEmail(location.state.email || '');
      setCombinedText(`${location.state.listeningText || ''}\n\nSummary:\n${location.state.summary || ''}`);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Simulate sending an email with the listening text and summary
      // Replace this with your actual API call
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/sendEmail2`, {
        title,
        name,
        email,
        listeningText: combinedText,
      });
      setSuccess(true);
      // Redirect to Voice Assistant page after 5 seconds
      setTimeout(() => {
        navigate('/Voice-Assistant');
      }, 5000);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const back = () => {
    navigate('/Voice-Assistant');
  };

  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-md-2">
          {/* Sidebar Spalte */}
          {/* Hier kann Sidebar-Inhalt hinzugefügt werden */}
        </div>
        <div className="col-md-7">
          {/* Hauptinhalt Spalte */}
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Transkriptionsdetails</h2>
              {success ? (
                <p className="text-center">Transkription erfolgreich an {email} gesendet!</p>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name:
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Titel:
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      E-Mail:
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="combinedText" className="form-label">
                    Gehörter Text:
                    </label>
                    <textarea
                      id="combinedText"
                      value={combinedText}
                      onChange={(e) => setCombinedText(e.target.value)}
                      className="form-control"
                      rows={10}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary mt-4" disabled={loading}>
                    {loading ? "Bitte warten..." : "Transkription senden"}
                  </button>
                  <button className="btn btn-danger ms-2 mt-4" onClick={back}>
                    Abbrechen
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TranscriptionForm;
