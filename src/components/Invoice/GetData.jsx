import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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
        .then(response => response.json())
        .then(data => {
          setData(data);
          fetchPostInvoiceData(data.matched_invoices);
        })
        .catch(error => console.error('Fehler beim Abrufen der Daten:', error))
        .finally(() => setLoading(false));
    }
  }, [state]);
  
  const fetchPostInvoiceData = (invoiceData) => {
    fetch(`${import.meta.env.VITE_API_URL}/compareInvoices`)
      .then(response => response.json())
      .then(postData => {
        setPostInvoiceData(postData.matched_invoices);
        const matchedValues = compareData(invoiceData, postData.matched_invoices);
        setMatchedData(matchedValues);
      })
      .catch(error => console.error('Fehler beim Abrufen der Nachrechnungsdaten:', error))
      .finally(() => setLoading(false));
  };
  
  const compareData = (invoiceData, postData) => {
    const matchedValues = [];
    postData.forEach((postInvoice, index) => {
      const matchedInvoice = invoiceData.find(invoice => (
        invoice.title === postInvoice.title &&
        invoice.category === postInvoice.category &&
        invoice.date === postInvoice.date &&
        invoice.due_date === postInvoice.due_date
      ));

      if (matchedInvoice) {
        matchedValues.push({
          title: matchedInvoice.title,
          category: matchedInvoice.category,
          date: matchedInvoice.date,
          due_date: matchedInvoice.due_date,
          matched: true,
          ...postInvoice
        });
      } else {
        matchedValues.push({
          title: postInvoice.title,
          category: postInvoice.category,
          date: postInvoice.date,
          due_date: postInvoice.due_date,
          matched: false,
          ...postInvoice
        });
      }
    });
    return matchedValues;
  };

  const openModal = (invoice) => {
    setSelectedInvoice(invoice);
    const modalElement = document.getElementById('invoiceModal');
    modalElement.classList.add('show');
    modalElement.style.display = 'block';
    document.body.classList.add('modal-open');
  };

  const closeModal = () => {
    setSelectedInvoice(null);
    const modalElement = document.getElementById('invoiceModal');
    modalElement.classList.remove('show');
    modalElement.style.display = 'none';
    document.body.classList.remove('modal-open');
  };

  return (
    <div className="container mt-5">
      <h2 className='text-center'>Rechnungsvergleich</h2>

      <div className="row mt-5">
        {/* Sidebar */}
        <div className="col-md-2">
          {/* Sidebar content */}
        </div>

        {/* Content */}
        <div className="col-md-10">
          {loading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : matchedData.length > 0 ? (
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {matchedData.map((matchedValue, index) => (
                <div className="col" key={index}>
                  <div className={`card h-100 ${matchedValue.matched ? 'border-success' : 'border-warning'}`}>
                    <div className="card-header bg-primary text-white">
                      <h2 className="text-center mb-0">Rechnung {index + 1}</h2>
                    </div>
                    <div className="card-body">
                      <p><strong>Titel:</strong> {matchedValue.title}</p>
                      {/* <p><strong>Produkt:</strong> {selectedInvoice.description}</p> */}
                  <p><strong>Produkt:</strong> {matchedValue.description}</p>


                      <p><strong>Kategorie</strong> {matchedValue.category}</p>
                      <p><strong>Datum:</strong> {matchedValue.date}</p>
                      <p><strong>Fälligkeitsdatum:</strong> {matchedValue.due_date}</p>
                      {matchedValue.matched ? (
                        <div className="alert alert-success" role="alert">
                          Rechnungsdaten stimmen mit den Nachrechnungsdaten überein.
                        </div>
                      ) : (
                        <div className="alert alert-warning" role="alert">
                          Rechnungsdaten stimmen nicht mit den Nachrechnungsdaten überein.
                        </div>
                      )}
                      <button className="btn btn-primary mt-3" onClick={() => openModal(matchedValue)}>Rechnung anzeigen</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center mt-5 error-message">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            Keine Übereinstimmung gefunden.
          </p>
          
          )}
        </div>
      </div>

      {/* Bootstrap modal */}
      <div className="modal fade" id="invoiceModal" tabIndex="-1" aria-labelledby="invoiceModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="invoiceModalLabel">Rechnungsdetails</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
            </div>
            <div className="modal-body">
              {selectedInvoice && (
                <>
                  <p><strong>Titel:</strong> {selectedInvoice.title}</p>
                  <p><strong>Rechnungsnummer:</strong> {selectedInvoice.invoice_number}</p>
                  <p><strong>Kategorie:</strong> {selectedInvoice.category}</p>
                  <p><strong>Währungscode:</strong> {selectedInvoice.currency_code}</p>
                  <p><strong>Datum:</strong> {selectedInvoice.date}</p>
                  <p><strong>Fälligkeitsdatum:</strong> {selectedInvoice.due_date}</p>
                  <p><strong>Dokumenttyp:</strong> {selectedInvoice.document_type}</p>
                  <p><strong>Produkt:</strong> {selectedInvoice.description}</p>
                  <p><strong>Steuer:</strong> {selectedInvoice.tax}</p>
                  <p><strong>Teilsumme:</strong> {selectedInvoice.subtotal}</p>
                  <p><strong>Gesamtsumme:</strong> {selectedInvoice.total}</p>

                  {selectedInvoice.matched ? (
                    <div className="alert alert-success" role="alert">
                      Rechnungsdaten stimmen mit den Nachrechnungsdaten überein.
                    </div>
                  ) : (
                    <div className="alert alert-warning" role="alert">
                      Rechnungsdaten stimmen nicht mit den Nachrechnungsdaten überein.
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
