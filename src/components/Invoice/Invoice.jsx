import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsX } from 'react-icons/bs'; // Import the cross icon

function Invoice() {
  const [files, setFiles] = useState([null]); // Initialize with one file input
  const [titles, setTitles] = useState(['']); // Initialize with one title input
  const [postInvoice, setPostInvoice] = useState({ file: null, title: '' }); // Initialize with one post invoice input
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (event, index) => {
    const newFiles = [...files];
    newFiles[index] = event.target.files[0];
    setFiles(newFiles);
  };

  const handleTitleChange = (event, index) => {
    const newTitles = [...titles];
    newTitles[index] = event.target.value;
    setTitles(newTitles);
  };

  const handlePostInvoiceFileChange = (event) => {
    const file = event.target.files[0];
    setPostInvoice({ ...postInvoice, file });
  };

  const handlePostInvoiceTitleChange = (event) => {
    const title = event.target.value;
    setPostInvoice({ ...postInvoice, title });
  };

  const handleRemoveFileInput = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1); // Remove file input at the specified index
    setFiles(newFiles);
    const newTitles = [...titles];
    newTitles.splice(index, 1); // Remove title input at the specified index
    setTitles(newTitles);
  };

  const sendInvoiceData = async () => {
    if (
      files.every(file => file) && 
      titles.every(title => title) && 
      postInvoice.file // Check if postInvoice file is not null
    ) {
      try {
        setUploading(true);
        setErrorMessage('');

        const invoiceData = await processInvoiceData();
        const postInvoiceResponse = await postInvoiceData();

        if (invoiceData && postInvoiceResponse) {
          // Continue with navigation if both requests are successful
          handleNextPageClick(invoiceData);
        }

      } catch (error) {
        console.error('Error uploading the invoices:', error);
        setErrorMessage('Error uploading the invoices.');
      } finally {
        setUploading(false);
      }
    } else {
      setErrorMessage('Please choose files, enter titles, and provide post invoice file.');
    }
  };

  const processInvoiceData = async () => {
    const formData = new FormData();
    
    // Add invoice files and titles to form data
    files.forEach(file => {
      formData.append('pdf', file);
    });
    titles.forEach(title => {
      formData.append('title', title);
    });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/extractInvoiceData`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process invoices.');
      }

      const responseData = await response.json();
      console.log('Response Data:', responseData);
      return responseData;

    } catch (error) {
      console.error('Error processing the invoices:', error);
      return null;
    }
  };

  const postInvoiceData = async () => {
    const formData = new FormData();
    formData.append('pdf', postInvoice.file); // Append the postInvoice file with the key 'pdf'
    const postInvoiceTitle = postInvoice.title; // Get the title entered by the user
    formData.append('title', postInvoiceTitle); // Append the user-provided title with the key 'title'

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/postinvoice`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to post invoice data.');
      }
      
      return true;

    } catch (error) {
      console.error('Error posting the invoice data:', error);
      return false;
    }
  };
  
  const handleNextPageClick = (data) => {
    navigate('/invoice-details', { state: { data } });
  };

  const handleBackButtonClick = () => {
    navigate('/Invoices'); // Navigate back one step
  };

  return (
    <div className="container mt-5">
    <h2 className="text-center mb-4">Rechnungsverarbeitung</h2>
    <div className="row justify-content-center">
      <div className="col-md-2">
        <button onClick={handleBackButtonClick} className="btn btn-secondary">Zurück</button>
      </div>
      <div className="col-md-10">
        {/* Lieferrechnung Abschnitt */}
        <h3>Lieferrechnung</h3>
        {files.map((file, index) => (
          <div key={index} className="mb-3">
            <div className="d-flex align-items-center">
              <input
                type="text"
                value={titles[index]}
                onChange={(event) => handleTitleChange(event, index)}
                placeholder="Produktname eingeben"
                className="form-control mb-3"
                required
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveFileInput(index)}
                  className="btn btn-link mb-2"
                >
                  <BsX size={20} color="red" /> {/* Kreuzsymbol */}
                </button>
              )}
            </div>
            <input
              type="file"
              onChange={(event) => handleFileChange(event, index)}
              className="form-control mb-2"
              accept=".pdf"
              required
            />
          </div>
        ))}
        {/* Vergangene Rechnungen Abschnitt */}
        <h3>Vergangene Rechnungen</h3>
        <div className="mb-3">
          <input
            type="text"
            value={postInvoice.title}
            onChange={handlePostInvoiceTitleChange}
            placeholder="Titel der vergangenen Rechnung eingeben"
            className="form-control mb-2"
            required
          />
          <input
            type="file"
            onChange={handlePostInvoiceFileChange}
            className="form-control mb-2"
            accept=".pdf"
            required
          />
        </div>
        <div style={{ color: 'red', marginTop: '5px', fontSize: '14px' }}>{errorMessage}</div>
        <button onClick={sendInvoiceData} className="btn btn-primary mb-3" disabled={uploading}>
          {uploading ? 'Hochladen...' : 'Rechnungen hochladen'}
        </button>
      </div>
    </div>
  </div>
  
  
  );
}

export default Invoice;
