import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


function Invoice() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
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
    if (file && title && fromDate && toDate) {
      try {
        setUploading(true);
        setErrorMessage('');
  
        // Format fromDate and toDate
        const formattedFromDate = formatDate(fromDate);
        const formattedToDate = formatDate(toDate);
  
        const formData = new FormData();
        formData.append('pdf', file);
        formData.append('title', title);
        formData.append('fromDate', formattedFromDate); // Format fromDate
        formData.append('toDate', formattedToDate);     // Format toDate
  
        const response = await fetch(`${import.meta.env.VITE_API_URL}/extractInvoiceData`, {
          method: 'POST',
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error('Failed to process invoice.');
        }
  
        const responseData = await response.json();
        console.log('Response Data:', responseData);
  
        // Send original input dates to compareInvoices API
        const compareResponse = await fetch(`${import.meta.env.VITE_API_URL}/compareInvoices`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fromDate: formattedFromDate, toDate: formattedToDate }), // Sending original input dates
        });
  
        if (!compareResponse.ok) {
          throw new Error('Failed to compare invoices.');
        }
  
        const compareData = await compareResponse.json();
        // console.log('Compare Data:', compareData);
  
        handleNextPageClick(responseData);
  
      } catch (error) {
        console.error('Error processing the invoice:', error);
        setErrorMessage('Fehler beim Verarbeiten der Rechnung.');
      } finally {
        setUploading(false);
      }
    } else {
      setErrorMessage('Bitte wählen Sie eine Datei aus, geben Sie einen Titel ein und wählen Sie sowohl das Von-Datum als auch das Bis-Datum aus.');
    }
  };
  

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  
  const handleNextPageClick = (data) => {
    navigate('/invoice-details', { state: { data } });
  };

  const handleBackButtonClick = () => {
    navigate('/Invoices');
  };

  return (
    <div className="container mt-5">
    <h2 className="text-center mb-4">Bearbeitung von Lieferscheinen</h2>
    <div className="d-flex justify-content-end mb-3">
      <Link to={'/Past-invoices'} className="btn btn-secondary">Laden Sie frühere Rechnungen hoch
</Link>
    </div>
  
    <div className="row justify-content-center">
      <div className="col-md-2">
      </div>
      <div className="col-md-10">
        <div className="mb-3">
          <h3 className='p-2'>Lieferschein</h3>
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
          <div className="d-flex align-items-center mt-3">
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="Produktname eingeben"
              className="form-control mb-3"
              required
            />
          </div>
          <input
            type="file"
            onChange={handleFileChange}
            className="form-control mb-2"
            accept=".pdf"
            required
          />
        </div>
        <div style={{ color: 'red', marginTop: '5px', fontSize: '14px' }}>{errorMessage}</div>
        <button onClick={sendInvoiceData} className="btn btn-primary mb-3" disabled={uploading}>
          {uploading ? 'Hochladen...' : 'Rechnung hochladen'}
        </button>
       
      </div>
    </div>
  </div>
  
  
  );
}

export default Invoice;
