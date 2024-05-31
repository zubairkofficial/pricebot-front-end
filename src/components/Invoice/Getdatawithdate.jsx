import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";

function InvoiceDetail() {
  const { uploadDate } = useParams();
  const [invoiceData, setInvoiceData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
    fetchInvoiceData(uploadDate);
  }, [uploadDate]);

  const fetchInvoiceData = async (date) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/getInvoiceDataByUploadDate/${uploadDate}`
      );
      console.log(response);
      const data = await response.json();
      setInvoiceData(data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const openModal = (invoice) => {
    setSelectedInvoice(invoice);
    const modalElement = document.getElementById("invoiceModal");
    modalElement.classList.add("show");
    modalElement.style.display = "block";
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    setSelectedInvoice(null);
    const modalElement = document.getElementById("invoiceModal");
    modalElement.classList.remove("show");
    modalElement.style.display = "none";
    document.body.classList.remove("modal-open");
  };

  const handleDeleteInvoice = async (invoiceId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/deleteInvoiceById/${invoiceId}`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        // If deletion is successful, fetch updated invoice data
        await fetchInvoiceData(uploadDate);
        toast.success("Rechnungen erfolgreich gelöscht");
      } else {
        // Handle deletion failure
        console.error("Failed to delete invoice.");
      }
    } catch (error) {
      console.error("Error deleting invoice:", error);
    }
  };

  return (
    <div className="container mt-5" style={{ position: "relative" }}>
      <Link
        to={"/Records"}
        className="btn btn-secondary position-absolute top-0 end-0"
      >
        Zurück
      </Link>

      <h2 className="text-center mt-4">Rechnungsdaten für {uploadDate}</h2>

      <div className="row mt-5">
        <div className="col-md-2"></div>

        <div className="col-md-10">
          {isLoading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "200px" }}
            >
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Wird geladen...</span>
              </div>
            </div>
          ) : invoiceData.length > 0 ? (
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {invoiceData.map((invoice, index) => (
                <div
                  className="col"
                  key={index}
                  onClick={() => openModal(invoice)}
                  style={{ cursor: "pointer" }}
                >
                  <div
                    className={`card h-100 ${
                      invoice.matched ? "border-success" : "border-warning"
                    }`}
                  >
                    <div className="card-header bg-primary text-white">
                      <h4 className="text-center mb-0">Rechnung {index + 1}</h4>
                    </div>

                    <div className="card-body">
                      
                      <p>
                        <strong>Produkt::</strong> {invoice.description}
                      </p>
                      <p>
                        <strong>Rechnungsnummer:</strong>{" "}
                        {invoice.invoice_number}
                      </p>

                      {/* <p><strong>Kategorie:</strong> {invoice.category}</p> */}
                      <p>
                        <strong>Datum:</strong> {invoice.date}
                      </p>
                      <p>
                        <strong>Fälligkeitsdatum:</strong> {invoice.due_date}
                      </p>
                      {invoice.matched ? (
                        <div className="alert alert-success" role="alert">
                          Rechnungsdaten stimmen mit den Nachrechnungsdaten
                          überein.
                        </div>
                      ) : (
                        <div className="alert alert-warning" role="alert">
                          Rechnungsdaten stimmen nicht mit den
                          Nachrechnungsdaten überein.
                        </div>
                      )}

                      <div className="text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteInvoice(invoice.id);
                          }}
                          className="btn btn-danger mt-3"
                        >
                          Rechnung löschen
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center mt-5 error-message">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              Keine passenden Rechnungen gefunden.
            </p>
          )}
        </div>
      </div>

      <div
        className="modal fade"
        id="invoiceModal"
        tabIndex="-1"
        aria-labelledby="invoiceModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="invoiceModalLabel">
                Rechnungsdetails
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Schließen"
                onClick={closeModal}
              ></button>
            </div>
            <div className="modal-body">
              {selectedInvoice && (
                <>
                 
                  <p>
                    <strong>Rechnungsnummer:</strong>{" "}
                    {selectedInvoice.invoice_number}
                  </p>
                  {/* <p><strong>Kategorie:</strong> {selectedInvoice.category}</p> */}
                  <p>
                    <strong>Währungscode:</strong>{" "}
                    {selectedInvoice.currency_code}
                  </p>
                  <p>
                    <strong>Datum:</strong> {selectedInvoice.date}
                  </p>
                  <p>
                    <strong>Fälligkeitsdatum:</strong>{" "}
                    {selectedInvoice.due_date}
                  </p>
                  {/* <p><strong>Dokumenttyp:</strong> {selectedInvoice.document_type}</p> */}
                  <p>
                    <strong>Produkt:</strong> {selectedInvoice.description}
                  </p>
                  <p>
                    <strong>Steuer:</strong> {selectedInvoice.tax}
                  </p>
                  <p>
                    <strong>Teilsumme:</strong> {selectedInvoice.subtotal}
                  </p>
                  <p>
                    <strong>Gesamtsumme:</strong> {selectedInvoice.price}
                  </p>
                  {/* Add more invoice details here */}
                  <button className="btn btn-secondary" onClick={closeModal}>
                    Schließen
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceDetail;
