import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
 

function InvoiceDetails() {
  const location = useLocation();
  const { state } = location;
  const [data, setData] = useState(null);
  const [postInvoiceData, setPostInvoiceData] = useState(null);

  useEffect(() => {
    if (state && state.data) {
      setData(state.data);
      fetchPostInvoiceData();
    } else {
      fetch(`${import.meta.env.VITE_API_URL}/showLatestInvoice`)
        .then(response => response.json())
        .then(data => {
          setData(data);
          fetchPostInvoiceData();
        })
        .catch(error => console.error('Fehler beim Abrufen der Daten:', error));
    }
  }, [state]);

  const fetchPostInvoiceData = () => {
    fetch(`${import.meta.env.VITE_API_URL}/postinvoice2`)
      .then(response => response.json())
      .then(data => {
        console.log('Daten der Nachrechnung:', data); // Logging the data
        setPostInvoiceData(data);
      })
      .catch(error => console.error('Fehler beim Abrufen der Daten der Nachrechnung:', error));
  };
  

  if (!data || !postInvoiceData) {
    return <div className="container mt-5">Laden...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className='text-center ms-5'> Rechnungsvergleich</h2>

      <div className="row mt-5" >
        {/* Seitenleiste */}
        <div className="col-md-2">
          {/* Fügen Sie hier Inhalte für die Seitenleiste hinzu */}
        </div>

        {/* Erste Rechnung */}
        <div className="col-md-5">
          <div className="card mb-3 shadow-sm">
            <div className="card-header bg-primary text-white">
              <h2 className="text-center mb-0">Rechnungsdetails</h2>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col">
                  <h5 className="fw-bold">Produkt: {data.title}</h5>
                </div>
                <div className="col">
                  <h5 className="fw-bold text-end">Rechnungsnummer: {data.invoice_number}</h5>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <p><strong>Kategorie:</strong> {data.category}</p>
                  <p><strong>Währungscode:</strong> {data.currency_code}</p>
                  <p><strong>Datum:</strong> {data.date}</p>
                  <p><strong>Fälligkeitsdatum:</strong> {data.due_date}</p>
                  <p><strong>Rechnungstyp:</strong> {data.document_type}</p>
                </div>
                <div className="col">
                  <p><strong>Nettobetrag:</strong> {data.subtotal}</p>
                  <p><strong>Steuer:</strong> {data.tax}</p>
                  <p><strong>Gesamt:</strong> {data.total}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Zweite Rechnung */}
        <div className="col-md-5">
          <div className="card mb-3 shadow-sm">
            <div className="card-header bg-primary text-white">
              <h2 className="text-center mb-0">Nachrechnungsdetails</h2>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col">
                  <h5 className="fw-bold">Produkt: {postInvoiceData.title}</h5>
                </div>
                <div className="col">
                  <h5 className="fw-bold text-end">Rechnungsnummer: {postInvoiceData.invoice_number}</h5>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <p><strong>Kategorie:</strong> {postInvoiceData.category}</p>
                  <p><strong>Währungscode:</strong> {postInvoiceData.currency_code}</p>
                  <p><strong>Datum:</strong> {postInvoiceData.date}</p>
                  <p><strong>Fälligkeitsdatum:</strong> {postInvoiceData.due_date}</p>
                  <p><strong>Rechnungstyp:</strong> {postInvoiceData.document_type}</p>
                </div>
                <div className="col">
                  <p><strong>Nettobetrag:</strong> {postInvoiceData.subtotal}</p>
                  <p><strong>Steuer:</strong> {postInvoiceData.tax}</p>
                  <p><strong>Gesamt:</strong> {postInvoiceData.total}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="row">
        <div className="col-md-12 text-center">
          <button className="btn btn-primary" onClick={handleGoBack}>Zurück</button>
        </div>
      </div> */}
    </div>
  );
}

export default InvoiceDetails;
