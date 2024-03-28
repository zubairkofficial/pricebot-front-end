import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function TranscriptionForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const location = useLocation();
  const { text, summary } = location.state || {};
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/sendEmail`,
        {
          name,
          email,
          transcriptionText: text,
          summary, // Include the summary in the data sent to the backend
        }
      );
      setSuccess(true);
      // Redirect to Voice Assistant page after 5 seconds
      setTimeout(() => {
        navigate("/Voice-Assistant");
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const back = () => {
    navigate("/Voice-Assistant");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-2">
          {" "}
          {/* Sidebar Column */}
          {/* Sidebar content can be added here */}
        </div>
        <div className="col-md-7">
          {" "}
          {/* Main Content Column */}
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Get Transcription via Email</h2>
              {success ? (
                <p className="text-center">
                  Transcription sent to {email} successfully!
                </p>
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
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email:
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="transcription" className="form-label">
                      Transcription:
                    </label>
                    <textarea
                      id="transcription"
                      value={text + "\n\n" + "Summary:" + summary}
                      className="form-control"
                      readOnly
                      rows={7} // Increase the number of rows to accommodate both transcription and summary
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary mt-4"
                    disabled={loading}
                  >
                    Send Transcription
                  </button>
                  {error && <p className="text-danger mt-2">Error: {error}</p>}
                  <button
                    className="btn btn-danger ms-2 mt-4"
                    onClick={back}
                    disabled={loading}
                  >
                    Cancel
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
