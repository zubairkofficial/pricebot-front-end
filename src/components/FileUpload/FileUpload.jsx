import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FileUpload = () => {
  const [title, setTitle] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [excelFile, setExcelFile] = useState(null);
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gpt-3.5-turbo-instruct"); // Default model
  const navigate = useNavigate();

  const handleExcelFileChange = (event) => {
    setExcelFile(event.target.files[0]);
  };

  const handlePdfFileChange = (event) => {
    setPdfFile(event.target.files[0]);
  };

  const handleApiKeyChange = (event) => {
    setApiKey(event.target.value);
  };

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };

  const confirmation = async () => {
    if (!pdfFile || !excelFile || !title) {
      setError(
        "Please select both PDF and Excel files, provide a title, and enter the API key."
      );
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formDataPdf = new FormData();
      formDataPdf.append("pdf", pdfFile);
      formDataPdf.append("title", title);

      const formDataExcel = new FormData();
      formDataExcel.append("excel", excelFile);
      formDataExcel.append("title", title);

      // Call API to get API key and model

      // Extract data from Excel
      const resp2 = await axios.post(
        `${import.meta.env.VITE_API_URL}/excel-extract`,
        formDataExcel
      );
      // console.log(resp2.data);

      if (resp2.status === 200) {
        const excelDataId = resp2.data.excelDataId;

        // Send data to OCR process with excelDataId
        const resp1 = await axios.post(
          `${import.meta.env.VITE_API_URL}/ocr-process`,
          formDataPdf,
          {
            params: {
              excelDataId: excelDataId,
            },
          }
        );
        console.log(resp1.data);
        console.log(resp2.data);

        if (resp1.status === 200) {
          setShowSuccessAlert(true);

          const pdfData = resp1.data;
          const excelData = resp2.data;

          // Redirect to List-data with extracted data
          navigate("/Data", {
            state: { pdfData, excelData, excelDataId },
          });
        } else {
          console.error("Invalid response status:", resp1.status);
        }
      } else {
        console.error("Invalid response status:", resp2.status);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAlertClose = () => {
    setShowSuccessAlert(false);
  };

  return (
    <>
      <section className="pc-container">
        <div className="pc-content">
          <div className="row">

            <h2 className="text-center p-3">Preisbot</h2>
            <div className="col-12">
              <div className="card shadow-lg">
                <div className="card-body">
                  <div className="mb-4">
                    <h5 style={{ color: "#E1142B" }}>Titel</h5>
                    <input
                      className="form-control"
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="excelFile"
                      className="form-label"
                      style={{ color: "#E1142B" }}
                    >
                      Excel-Datei-Upload
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      id="excelFile"
                      onChange={handleExcelFileChange}
                      accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="pdfFile"
                      className="form-label"
                      style={{ color: "#E1142B" }}
                    >
                      PDF-Dateien
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      id="pdfFile"
                      onChange={handlePdfFileChange}
                      accept="application/pdf"
                    />
                  </div>

                  {isLoading ? (
                    <button
                      disabled
                      className="btn btn-block"
                      style={{ backgroundColor: "#019645", color: "#ffffff" }}
                    >
                      Bitte warten. Die Daten werden extrahiert
                    </button>
                  ) : (
                    <button
                      onClick={confirmation}
                      className="btn btn-block"
                      style={{
                        backgroundColor: "#019645",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "10px",
                      }}
                    >
                      Bestätigen
                    </button>
                  )}

                  {showSuccessAlert && (
                    <div
                      className="alert alert-success alert-dismissible fade show mt-3"
                      role="alert"
                    >
                      Data compared successfully. Please download the file.
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                        onClick={handleAlertClose}
                      ></button>
                    </div>
                  )}

                  {error && (
                    <div className="text-center mt-3">
                      <small style={{ color: "red" }}>{error}</small>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FileUpload;
