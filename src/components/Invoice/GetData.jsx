import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function InvoiceDetails() {
  const location = useLocation();
  const { state } = location;
  const [data, setData] = useState(null);

  useEffect(() => {
    if (state && state.data) {
      setData(state.data);
    } else {
      fetch(`${import.meta.env.VITE_API_URL}/showLatestInvoice`)
        .then(response => response.json())
        .then(data => {
          console.log('Data received from API:', data);
          setData(data);
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [state]);

  if (!data) {
    return <div className="container mt-5">Loading...</div>;
  }

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col-md-2">
         
        </div>
        <div className="col-md-4 ms-5 "  >
          {/* Main content */}
          <h2 className="text-center mb-4">Invoice Details</h2>
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">{data.invoice_number}</h3>
              <p className="card-text"><strong>Category:</strong> {data.category}</p>
              <p className="card-text"><strong>Currency Code:</strong> {data.currency_code}</p>
              <p className="card-text"><strong>Date:</strong> {data.date}</p>
              <p className="card-text"><strong>Due Date:</strong> {data.due_date}</p>
              <p className="card-text"><strong>Invoice Type:</strong> {data.document_type}</p>
              <p className="card-text"><strong>Subtotal:</strong> {data.subtotal}</p>
              <p className="card-text"><strong>Tax:</strong> {data.tax}</p>
              <p className="card-text"><strong>Total:</strong> {data.total}</p>
              {/* Render other fields as needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceDetails;
