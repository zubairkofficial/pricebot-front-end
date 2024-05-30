import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

const DataAnalysis = () => {
  const [file, setFile] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState("");

  const handleDataAnalysisFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDataAnalysisPromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const sendDataAnalysisData = async () => {
    if (!file) {
      setErrorMessage("Bitte laden Sie eine Excel-Datei hoch.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("prompt", prompt);

    try {
      setUploading(true);
      setErrorMessage("");
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/processDataAnalysis`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: 'text', // Ensure response is handled as plain text
      });

      setResult(response.data);
      setUploading(false);
    } catch (error) {
      console.error("Error uploading data:", error);
      setErrorMessage("Fehler beim Hochladen der Daten.");
      setUploading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 mt-5">Datenanalyse</h2>
      <div className="row justify-content-center">
        <div className="col-md-2"></div>
        <div className="col-md-10">
          <div className="d-flex justify-content-end mb-3">
            <Link to={"/List"} className="btn btn-primary ms-2">
              Zurück
            </Link>
          </div>

          <div className="mb-3">
            <h3 className="p-2">Laden Sie Ihre Daten hoch</h3>
            <input
              type="file"
              onChange={handleDataAnalysisFileChange}
              className="form-control mt-3"
              accept=".xlsx"
              required
            />
          </div>
          <div className="mb-3">
            <textarea
              value={prompt}
              onChange={handleDataAnalysisPromptChange}
              placeholder="Schreiben Sie Ihren Analyse-Prompt hier"
              className="form-control"
              rows="5"
            ></textarea>
          </div>
          {errorMessage && (
            <div style={{ color: "red", marginTop: "5px", fontSize: "14px" }}>
              {errorMessage}
            </div>
          )}
          <button
            onClick={sendDataAnalysisData}
            className="btn btn-primary mb-3"
            disabled={uploading}
          >
            {uploading ? "Schreiben..." : "Datenanalyse starten"}
          </button>

          {result && (
           <div className="mt-5 p-4 bg-light rounded shadow-sm">
           <h3 className="text-center text-dark">Analyseergebnis</h3>
           <p className="mt-3" style={{ whiteSpace: "pre-wrap", color: "#333" }}>
             {result}
           </p>
         </div>
         
          )}
        </div>
      </div>
    </div>
  );
};

export default DataAnalysis;
