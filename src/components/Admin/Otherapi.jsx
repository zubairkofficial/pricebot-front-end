import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const OtherAPIs = () => {
  const [ocSpaceApiKey, setOcSpaceApiKey] = useState("");
  const [deepgramApiKey, setDeepgramApiKey] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchOcSpaceApiKey();
    fetchDeepgramApiKey();
  }, []);

  const fetchOcSpaceApiKey = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/getOcSpaceApiKey`);
      if (response.ok) {
        const data = await response.json();
        setOcSpaceApiKey(data.apiKey);
      } else {
        throw new Error('Failed to fetch OC.Space API key');
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const fetchDeepgramApiKey = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/getDeepgramApiKey`);
      if (response.ok) {
        const data = await response.json();
        setDeepgramApiKey(data.apiKey);
      } else {
        throw new Error('Failed to fetch Deepgram API key');
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleOcSpaceApiKeyChange = (e) => {
    setOcSpaceApiKey(e.target.value);
  };

  const handleDeepgramApiKeyChange = (e) => {
    setDeepgramApiKey(e.target.value);
  };

  const saveOcSpaceApiKey = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/saveOcSpaceApiKey`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ apiKey: ocSpaceApiKey })
      });

      if (!response.ok) {
        throw new Error('Failed to save OC.Space API key');
      }

      toast.success("OC.Space API-Schlüssel erfolgreich eingefügt", {
        duration: 3000
      });

      localStorage.setItem("oc_space_api_key", ocSpaceApiKey);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const saveDeepgramApiKey = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/Deepgramapi`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ apiKey: deepgramApiKey })
      });

      if (!response.ok) {
        throw new Error('Failed to save Deepgram API key');
      }

      toast.success("Deepgram API-Schlüssel erfolgreich eingefügt", {
        duration: 3000
      });

      localStorage.setItem("deepgram_api_key", deepgramApiKey);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 mt-5">Andere APIs Einstellungen</h2>
      <div className="row justify-content-center">
        <div className="col-md-2"></div>
        <div className="col-md-10">
          <div className="d-flex justify-content-end mb-3">
            <Link to={"/Admin"} className="btn btn-secondary ms-2">
              Zurück
            </Link>
          </div>

          {/* OC.Space API Section */}
          <div className="mb-3">
            <h3 className="p-2">OCR.Space API</h3>
            <input
              type="text"
              value={ocSpaceApiKey}
              onChange={handleOcSpaceApiKeyChange}
              placeholder="Geben Sie Ihren OC.Space API-Schlüssel ein"
              className="form-control"
              required
            />
            <button onClick={saveOcSpaceApiKey} className="btn btn-primary mt-3">
              API-Schlüssel speichern
            </button>
          </div>

          {/* Deepgram API Section */}
          <div className="mb-3">
            <h3 className="p-2">Deepgram API</h3>
            <input
              type="text"
              value={deepgramApiKey}
              onChange={handleDeepgramApiKeyChange}
              placeholder="Geben Sie Ihren Deepgram API-Schlüssel ein"
              className="form-control"
              required
            />
            <button onClick={saveDeepgramApiKey} className="btn btn-primary mt-3">
              API-Schlüssel speichern
            </button>
          </div>

          {errorMessage && (
            <div style={{ color: "red", marginTop: "5px", fontSize: "14px" }}>
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtherAPIs;
