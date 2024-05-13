import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function InvoiceDetails() {
  const location = useLocation();
  const { state } = location;
  const [data, setData] = useState(null);
  const [postInvoiceData, setPostInvoiceData] = useState(null);
  const [matchedData, setMatchedData] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null); // Track the selected invoice
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (state && state.data) {
      setData(state.data);
      fetchPostInvoiceData(state.data);
    } else {
      fetch(`${import.meta.env.VITE_API_URL}/compareInvoices`)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          fetchPostInvoiceData(data.matched_invoices);
        })
        .catch((error) =>
          console.error("Fehler beim Abrufen der Daten:", error)
        )
        .finally(() => setLoading(false));
    }
  }, [state]);

  const fetchPostInvoiceData = (invoiceData) => {
    fetch(`${import.meta.env.VITE_API_URL}/compareInvoices`)
      .then((response) => response.json())

      .then((postData) => {
        setPostInvoiceData(postData.matched_invoices);
        const matchedValues = compareData(
          invoiceData,
          postData.matched_invoices
        );
        setMatchedData(matchedValues);
      })
      .catch((error) =>
        console.error("Fehler beim Abrufen der Nachrechnungsdaten:", error)
      )
      .finally(() => setLoading(false));
  };
  console.log(fetchPostInvoiceData);

  const compareData = (invoiceData, postData) => {
    const matchedValues = [];
    postData.forEach((postInvoice, index) => {
      const matchedInvoice = invoiceData.find(
        (invoice) =>
          invoice.title === postInvoice.title &&
          invoice.category === postInvoice.category &&
          invoice.date === postInvoice.date &&
          invoice.due_date === postInvoice.due_date
      );

      if (matchedInvoice) {
        matchedValues.push({
          title: matchedInvoice.title,
          category: matchedInvoice.category,
          date: matchedInvoice.date,
          due_date: matchedInvoice.due_date,
          matched: true,
          ...postInvoice,
        });
      } else {
        matchedValues.push({
          title: postInvoice.title,
          category: postInvoice.category,
          date: postInvoice.date,
          due_date: postInvoice.due_date,
          matched: false,
          ...postInvoice,
        });
      }
    });
    return matchedValues;
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

  return (
    <div className="container mt-5" style={{ position: "relative" }}>
      {/* Back Button at the top left end of the container */}
      <Link
        to={"/Delivery-Bills"}
        className="btn btn-secondary position-absolute top-0 end-0"
      >
        Zurück
      </Link>

      <h2 className="text-center">Rechnungsvergleich</h2>

      <div className="row mt-5">
        {/* Sidebar */}
        <div className="col-md-2">
          {/* Placeholder for future sidebar content */}
        </div>

        {/* Main Content */}
        <div className="col-md-10">
          {loading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "200px" }}
            >
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : matchedData.length > 0 ? (
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {matchedData.map((matchedValue, index) => (
                <div className="col" key={index}>
                  <div
                    className="card h-100"
                    style={{
                      boxShadow:
                        "rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 0px 0px",
                      borderRadius: "28px",
                    }}
                  >
                    <div
                      className="card-header text-white"
                      style={{ borderRadius: "28px" }}
                    >
                      <h2 className="text-center mb-0">
                        <span className="bg-primary text-white px-3 py-1 b-2 p-5 rounded">
                          Rechnung {index + 1}
                        </span>
                      </h2>
                    </div>

                    <div className="card-body d-flex flex-column">
                      <div
                        style={{
                          backgroundColor: "rgba(0, 0, 0, 0.05)", // Slight black background color
                          padding: "10px",
                          borderRadius: "8px",
                          marginBottom: "10px",
                        }}
                      >
                        <p>
                          <strong>Titel:</strong>{" "}
                          <span  > {matchedValue.title} </span>
                        </p>
                      </div>
                      <div
                        style={{
                          backgroundColor: "rgba(0, 0, 0, 0.05)", // Slight black background color
                          padding: "10px",
                          borderRadius: "8px",
                          marginBottom: "10px",
                        }}
                      >
                        <p>
                          <strong>Produkt:</strong> {matchedValue.description}
                        </p>
                      </div>
                      <div
                        style={{
                          backgroundColor: "rgba(0, 0, 0, 0.05)", // Slight black background color
                          padding: "10px",
                          borderRadius: "8px",
                          marginBottom: "10px",
                        }}
                      >
                        <p>
                          <strong >Datum:</strong> {matchedValue.date}
                        </p>
                      </div>
                      <div
                        style={{
                          backgroundColor: "rgba(0, 0, 0, 0.05)", // Slight black background color
                          padding: "10px",
                          borderRadius: "8px",
                          marginBottom: "10px",
                        }}
                      >
                        <p>
                          <strong>Fälligkeitsdatum:</strong>{" "}
                          {matchedValue.due_date}
                        </p>
                      </div>
                      {matchedValue.matched ? (
                        <div
                        className="alert alert-success text-primary p-3"
                        role="alert"
                        style={{ letterSpacing: "0.5px" , fontSize:'16px' }} // Adjust the letter spacing value as needed
                      >
                      <b> Rechnungsdaten stimmen mit den Nachrechnungsdaten überein.</b>  
                      </div>
                      
                      ) : (
                        <div className="alert alert-warning" role="alert">
                          Rechnungsdaten stimmen nicht mit den
                          Nachrechnungsdaten überein.
                        </div>
                      )}
                      <div className="mt-auto d-flex justify-content-end">
                        <button
                          className="btn btn-primary"
                          style={{ fontSize: "16px" }}
                          onClick={() => openModal(matchedValue)}
                        >
                          Rechnung anzeigen
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center mt-5 error-message">
              <i className="bi bi-exclamation-triangle-fill me-2 "></i>
              Keine Übereinstimmung gefunden.
            </p>
          )}
        </div>
      </div>

      {/* Bootstrap modal */}
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
                aria-label="Close"
                onClick={closeModal}
              ></button>
            </div>
            <div className="modal-body">
              {selectedInvoice && (
                <>
                  <p>
                    <strong>Titel:</strong> {selectedInvoice.title}
                  </p>
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

                  {selectedInvoice.matched ? (
                    <div className="alert alert-success" role="alert">
                      Rechnungsdaten stimmen mit den Nachrechnungsdaten überein.
                    </div>
                  ) : (
                    <div
                      className="alert alert-warning text-primary"
                      role="alert"
                    >
                      <span>
                        {" "}
                        Rechnungsdaten stimmen nicht mit den Nachrechnungsdaten
                        überein.
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceDetails;
