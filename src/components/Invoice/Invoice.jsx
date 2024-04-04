import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Invoice() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (event) => setFile(event.target.files[0]);
  const handleTitleChange = (event) => setTitle(event.target.value);

  const sendInvoiceData = async () => {
    if (file && title) {
      const formData = new FormData();
      formData.append('pdf', file);
      formData.append('title', title);

      try {
        setUploading(true);
        setErrorMessage('');

        const response = await fetch(`${import.meta.env.VITE_API_URL}/extractInvoiceData`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) throw new Error('Network response was not successful.');

        const data = await response.json();
        console.log('Invoice processed:', data);

        // Navigate and pass data
        handleNextPageClick(data); // Pass the data to the next page
      } catch (error) {
        console.error('Error uploading the invoice:', error);
        setErrorMessage('Error uploading the invoice.');
      } finally {
        setUploading(false);
      }
    } else {
      setErrorMessage('Please choose a file and enter a title.');
    }
  };

  const handleNextPageClick = (data) => {
    navigate('/invoice-details', { state: { data } }); // Pass the data to the next page
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Invoice Processor</h2>
      <div className="row justify-content-center">
        <div className="col-md-2"></div>
        <div className="col-md-10">
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter invoice title"
            className="form-control mb-3"
            required
          />
          <input
            type="file"
            onChange={handleFileChange}
            className="form-control mb-3"
            accept=".pdf"
            required
          />
          <div style={{ color: 'red', marginTop: '5px', fontSize: '14px' }}>{errorMessage}</div>
          <button onClick={sendInvoiceData} className="btn btn-primary mb-3" disabled={uploading}>
            {uploading ? 'Uploading...' : 'Upload Invoice'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Invoice;
