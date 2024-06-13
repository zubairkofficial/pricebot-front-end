import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsX } from "react-icons/bs";
import toast from "react-hot-toast";

function Edittool() {
  const [files, setFiles] = useState([[]]);
  const [titles, setTitles] = useState([""]);
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState([[]]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const userLoginId = localStorage.getItem("user_Login_Id");

  const handleFileChange = (event, index) => {
    const newFiles = [...files];
    newFiles[index] = Array.from(event.target.files);
    setFiles(newFiles);
  };

  const handleTitleChange = (event, index) => {
    const newTitles = [...titles];
    newTitles[index] = event.target.value;
    setTitles(newTitles);
  };

  const handleAddFileInput = () => {
    setFiles([...files, []]);
    setTitles([...titles, ""]);
    setResults([...results, []]);
  };

  const handleRemoveFileInput = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    const newTitles = [...titles];
    newTitles.splice(index, 1);
    setTitles(newTitles);
    const newResults = [...results];
    newResults.splice(index, 1);
    setResults(newResults);
  };

  const sendInvoiceData = async () => {
    try {
      setUploading(true);
      setErrorMessage("");
      setSuccessMessage("");

      const newResults = files.map(() => []);

      for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
        const filesArray = files[fileIndex];
        const title = titles[fileIndex];

        if (filesArray.length === 0) {
          throw new Error(
            "Bitte wählen Sie mindestens eine Datei zum Hochladen aus."
          );
        }

        for (const file of filesArray) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("title", title);
          formData.append("user_login_id", userLoginId); 

          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/processInvoice`,
            {
              method: "POST",
              body: formData,
            }
          );

          if (!response.ok)
            throw new Error("Network response was not successful.");

          const data = await response.json();
          newResults[fileIndex].push({
            fileName: file.name,
            result: data.result,
          });
        }
      }

      setResults(newResults);
      toast.success("Rechnung erfolgreich prüfen", { duration: 3000 });

      setFiles([[]]);
      setTitles([""]);
      document
        .querySelectorAll('input[type="file"]')
        .forEach((input) => (input.value = ""));
    } catch (error) {
      console.error("Error uploading the invoices:", error);
      toast.error(error.message || "Fehler beim Hochladen der Rechnungen");
    } finally {
      setUploading(false);
    }
  };

  const closeResult = (fileIndex, resultIndex) => {
    const newResults = [...results];
    newResults[fileIndex][resultIndex] = null;
    setResults(newResults);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Überprüfen Sie Ihre Rechnungen</h2>
      <div className="row justify-content-between align-items-end">
        <div className="col-md-6"></div>
        <div className="col-md-6 d-flex justify-content-end"></div>
      </div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-2"></div>
        <div className="col-md-10">
          {files.map((fileArray, fileIndex) => (
            <div key={fileIndex} className="mb-3">
              <h4 className = "p-2"> Laden Sie Ihre Rechnungen hoch</h4>
              <div className="d-flex align-items-center">
                {fileIndex > 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveFileInput(fileIndex)}
                    className="btn btn-link mb-2"
                  >
                    <BsX size={20} color="red" />
                  </button>
                )}
              </div>
              <input
                type="file"
                onChange={(event) => handleFileChange(event, fileIndex)}
                className="form-control mb-2"
                accept="image/*"
                required
                multiple
              />
              {results[fileIndex] && results[fileIndex].length > 0
                ? results[fileIndex].map(
                    (result, resultIndex) =>
                      result && (
                        <div
                          key={resultIndex}
                          className={`alert ${
                            result.result === "YES"
                              ? "alert-success"
                              : "alert-danger"
                          } d-flex align-items-center justify-content-between shadow-sm rounded p-3 mb-3`}
                          role="alert"
                        >
                          <span className="flex-grow-1">
                            {result.fileName} - {result.result}
                          </span>
                          <button
                            type="button"
                            className="btn btn-link text-decoration-none"
                            onClick={() => closeResult(fileIndex, resultIndex)}
                            aria-label="Close"
                          >
                            <BsX size={20} color="black" />
                          </button>
                        </div>
                      )
                  )
                : null}
            </div>
          ))}
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}

          <button
            onClick={sendInvoiceData}
            className="btn btn-primary mb-3"
            disabled={uploading}
          >
            {uploading ? "Wird hochgeladen..." : "Bild hochladen"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Edittool;
