import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

        const formData = new FormData();
        formData.append('pdf', file);
        formData.append('title', title);
        formData.append('fromDate', fromDate);
        formData.append('toDate', toDate);

        const response = await fetch(`${import.meta.env.VITE_API_URL}/extractInvoiceData`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to process invoice.');
        }

        const responseData = await response.json();
        console.log('Response Data:', responseData);
        
        handleNextPageClick(responseData);

      } catch (error) {
        console.error('Error processing the invoice:', error);
        setErrorMessage('Error processing the invoice.');
      } finally {
        setUploading(false);
      }
    } else {
      setErrorMessage('Please choose a file, enter a title, and select both from and to dates.');
    }
  };

  const handleNextPageClick = (data) => {
    navigate('/invoice-details', { state: { data } });
  };

  const handleBackButtonClick = () => {
    navigate('/Invoices');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Rechnungsbearbeitung</h2>
      <div className="row justify-content-center">
        <div className="col-md-2">
          <button onClick={handleBackButtonClick} className="btn btn-secondary">Zurück</button>
        </div>
        <div className="col-md-10">
        
          <div className="mb-3">
            
           <div className="d-flex justify-content-end ">
  <div className="me-3">
   
    <DatePicker
      selected={fromDate}
      onChange={handleFromDateChange}
      dateFormat="dd/MM/yyyy"
      placeholderText="Von Datum"
      className="form-control"
      required
    />
  </div>
  <div>
   
    <DatePicker
      selected={toDate}
      onChange={handleToDateChange}
      dateFormat="dd/MM/yyyy"
      placeholderText="Bis Datum"
      className="form-control"
      required
    />
  </div>
</div>

            <h3 className='p-2'>Lieferschein</h3>
            <div className="d-flex align-items-center">
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
