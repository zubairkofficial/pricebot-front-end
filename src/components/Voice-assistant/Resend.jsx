import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function TranscriptionForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [combinedText, setCombinedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const fetchEmail = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/getemailId/${userId}`
        );
        const emailData = response.data.emails[0];
        setName(emailData.name);
        setTitle(emailData.title);
        setEmail(emailData.email);
        setCombinedText(emailData.transcriptionText);
        setError("");
        setSuccess("");
      } catch (err) {
        setError("Fehler beim Abrufen der E-Mail-Daten");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchEmail();
    }
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/sendResend`, {
        title,
        name,
        email,
        transcriptionText: combinedText,
      });
      setSuccess("Transkription erfolgreich gesendet!");
      setError("");
    } catch (err) {
      setError("Senden der Transkription fehlgeschlagen");
      setSuccess("");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const back = () => navigate("/Voice-Assistant");

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-2">
          {/* Sidebar content can be added here */}
        </div>
        <div className="col-md-7">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">E-Mail-Details</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
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
                    className="form-control"
                    onChange={(e) => setTitle(e.target.value)}
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
                    className="form-control"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="transcription" className="form-label">
                    Transkription:
                  </label>
                  <textarea
                    id="transcription"
                    value={combinedText}
                    className="form-control"
                    rows="5"
                    onChange={(e) => setCombinedText(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary mt-4"
                  disabled={loading}
                >
                  {loading ? "Bitte warten..." : "Transkription senden"}
                </button>
                <button
                  type="button"
                  className="btn btn-danger ms-2 mt-4"
                  onClick={back}
                >
                  Abbrechen
                </button>
                {success && <div className="text-success mt-2">{success}</div>}
                {error && <div className="text-danger mt-2">{error}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TranscriptionForm;
