import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const DataAnalysis = () => {
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [newModel, setNewModel] = useState("");
  const [models, setModels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchApiKeyAndModel();
    fetchModels();
  }, []);

  const fetchApiKeyAndModel = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/getApi`);
      if (response.ok) {
        const data = await response.json();
        setApiKey(data.apiKey);
        setModel(data.model);
      } else {
        throw new Error('Failed to fetch API key and model');
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const fetchModels = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/getModels`);
      if (response.ok) {
        const data = await response.json();
        setModels(data.models);
      } else {
        throw new Error('Failed to fetch models');
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleApiKeyChange = (e) => {
    setApiKey(e.target.value);
  };

  const handleModelChange = (e) => {
    setModel(e.target.value);
  };

  const saveApiKeyAndModel = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/Apikey`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ apiKey, model })
      });

      if (!response.ok) {
        throw new Error('Failed to save API key and model');
      }

      toast.success("API-Schlüssel erfolgreich eingefügt", {
        duration: 3000
      });
      navigate('/Admin');

      localStorage.setItem("openai_api_key", apiKey);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const openModal = () => {
    setNewModel("");
    setErrorMessage("");
    const modal = new window.bootstrap.Modal(document.getElementById('addModelModal'));
    modal.show();
  };

  const saveNewModel = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/save_model`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ modelName: newModel })
      });
      if (!response.ok) {
        throw new Error('Failed to save model');
      }
      toast.success("Modell erfolgreich gespeichert", {
        duration: 2000
      });
      setModels([...models, newModel]);

      const modal = window.bootstrap.Modal.getInstance(document.getElementById('addModelModal'));
      modal.hide();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 mt-5">API-Einstellungen</h2>
      <div className="row justify-content-center">
        <div className="col-md-2"></div>
        <div className="col-md-10">
          <div className="d-flex justify-content-end mb-3">
            <Link to={"/Admin"} className="btn btn-primary ms-2">
              Zurück
            </Link>
            <button onClick={openModal} className="btn btn-secondary ms-2">
              Modell hinzufügen
            </button>
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={apiKey}
              onChange={handleApiKeyChange}
              placeholder="Geben Sie Ihren OpenAI-API-Schlüssel ein"
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <select
              value={model}
              onChange={handleModelChange}
              className="form-control"
              required
            >
              <option value="">Wählen Sie ein OpenAI-Modell</option>
              {models.map((model, index) => (
                <option key={index} value={model}>{model}</option>
              ))}
            </select>
            <button onClick={saveApiKeyAndModel} className="btn btn-secondary mt-2">
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

      <div className="modal fade" id="addModelModal" tabIndex="-1" role="dialog" aria-labelledby="addModelModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addModelModalLabel">Neues Modell hinzufügen</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                value={newModel}
                onChange={(e) => setNewModel(e.target.value)}
                placeholder="Geben Sie den Modellnamen ein"
                className="form-control mt-3"
                required
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Abbrechen</button>
              <button type="button" className="btn btn-primary" onClick={saveNewModel}>Modell speichern</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataAnalysis;
