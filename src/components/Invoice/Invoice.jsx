import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Invoice() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleFromDateChange = (date) => {
    setFromDate(date);
  };

  const handleToDateChange = (date) => {
    setToDate(date);
  };

  const sendInvoiceData = async () => {
    if (file  && fromDate && toDate) {
      try {
        setUploading(true);
        setErrorMessage("");
  
        // Format fromDate and toDate
        const formattedFromDate = formatDate(fromDate);
        const formattedToDate = formatDate(toDate);
  
        // Prepare data for storage API
        const storageData = {
          fromDate: formattedFromDate,
          toDate: formattedToDate,
        };
  
        // Send data to storage API
        const storageResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/dates`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(storageData),
          }
        );
  
        if (!storageResponse.ok) {
          throw new Error("Failed to store dates.");
        }
  
        // Send invoice data for processing
        const formData = new FormData();
        formData.append("pdf", file);
        // formData.append("title", title);
        formData.append("fromDate", formattedFromDate);
        formData.append("toDate", formattedToDate);
  
        const processingResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/extractInvoiceData`,
          {
            method: "POST",
            body: formData,
          }
        );
  
        if (!processingResponse.ok) {
          throw new Error("Failed to process invoice.");
        }
  
        const responseData = await processingResponse.json();
        console.log("Response Data:", responseData);
  
        // Compare invoices
        const compareResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/compareInvoices`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              fromDate: formattedFromDate,
              toDate: formattedToDate,
            }),
          }
        );
  
        if (!compareResponse.ok) {
          throw new Error("Failed to compare invoices.");
        }
  
        const compareData = await compareResponse.json();
        console.log("Compare Data:", compareData);
  
        handleNextPageClick(responseData);
      } catch (error) {
        console.error("Error processing the invoice:", error);
        setErrorMessage("Keine Rechnung gefunden");
      } finally {
        setUploading(false);
      }
    } else {
      setErrorMessage(
        "Bitte wählen Sie eine Datei aus und wählen Sie sowohl das Von-Datum als auch das Bis-Datum aus"
      );
    }
  };
  
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleNextPageClick = (data) => {
    navigate("/invoice-details", { state: { data } });
  };

  const handleBackButtonClick = () => {
    navigate("/Invoices");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Bearbeitung von Lieferscheinen</h2>
      <div className="d-flex justify-content-end mb-3">
        <Link to={"/Past-invoices"} className="btn btn-secondary">
          Laden Sie frühere Rechnungen hoch
        </Link>

        <Link to={"/Records"} className="btn btn-primary ms-2">
          Aufzeichnungen
        </Link>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-2"></div>
        <div className="col-md-10">
          <div className="mb-3">
            <h3 className="p-2">Rechnungen</h3>
            <div className="d-flex justify-content-start">
              <div className="me-3">
                <DatePicker
                  selected={fromDate}
                  onChange={handleFromDateChange}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Von Datum"
                  className="form-control"
                />
              </div>
              <div>
                <DatePicker
                  selected={toDate}
                  onChange={handleToDateChange}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Bis Datum"
                  className="form-control"
                />
              </div>
            </div>
            {/* <div className="d-flex align-items-center mt-3">
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="Produktname eingeben"
                className="form-control mb-3"
                required
              />
            </div> */}
            <input
              type="file"
              onChange={handleFileChange}
              className="form-control mt-3"
              accept=".pdf"
              required
            />
          </div>
          <div style={{ color: "red", marginTop: "5px", fontSize: "14px" }}>
            {errorMessage}
          </div>
          <button
            onClick={sendInvoiceData}
            className="btn btn-primary mb-3"
            disabled={uploading}
          >
            {uploading ? "Hochladen..." : "Lieferschein hochladen"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Invoice;
