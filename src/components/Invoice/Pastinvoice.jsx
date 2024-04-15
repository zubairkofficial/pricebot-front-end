import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsX } from 'react-icons/bs'; // Import the cross icon

function Invoice() {
  const [files, setFiles] = useState([null]); // Initialize with one file input
  const [titles, setTitles] = useState(['']); // Initialize with one title input
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

  const handleAddFileInput = () => {
    setFiles([...files, null]); // Add a new file input
    setTitles([...titles, '']); // Add a new title input
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
    try {
      setUploading(true);
      setErrorMessage('');
  
      const formData = new FormData();
  
      // Iterate over both files and titles arrays simultaneously
      files.forEach((file, index) => {
        formData.append(`pdf`, file); // Append file
        formData.append(`title`, titles[index]); // Append corresponding title
      });
  
      const response = await fetch(`${import.meta.env.VITE_API_URL}/postinvoice`, {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) throw new Error('Network response was not successful.');
  
      const responseData = await response.json();
      console.log('Response Data:', responseData);
  
      // Show success message
      alert('Invoices uploaded successfully.');
  
      // Clear input fields after successful upload
      setFiles([null]);
      setTitles(['']);
  
    } catch (error) {
      console.error('Error uploading the invoices:', error);
      // Show error message
      setErrorMessage('Error uploading the invoices.');
    } finally {
      setUploading(false);
    }
  };
  
  
  
  
  
  
  

  const handleNextPageClick = (data) => {
    navigate('/invoice-details', { state: { data } });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Past Invoices</h2>
      <div className="row justify-content-center">
        <div className="col-md-2"></div>
        <div className="col-md-10">
          {files.map((file, index) => (
            <div key={index} className="mb-3">
              <div className="d-flex align-items-center">
               
                <input
                  type="text"
                  value={titles[index]}
                  onChange={(event) => handleTitleChange(event, index)}
                  placeholder="Enter product name"
                  className="form-control mb-3"
                  required
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveFileInput(index)}
                    className="btn btn-link mb-2"
                  >
                    <BsX size={20} color="red" /> {/* Cross icon */}
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
          <button onClick={handleAddFileInput} className="btn btn-secondary mb-3 float-end">
            Add File
          </button>
          <div style={{ color: 'red', marginTop: '5px', fontSize: '14px' }}>{errorMessage}</div>
          <button onClick={sendInvoiceData} className="btn btn-primary mb-3" disabled={uploading}>
            {uploading ? 'Uploading...' : 'Upload Invoices'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Invoice;
