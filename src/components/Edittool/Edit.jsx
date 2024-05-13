import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsX } from 'react-icons/bs'; // Import the cross icon
import toast from 'react-hot-toast';

function Edittool() {
  const [files, setFiles] = useState([null]); // Initialize with one file input
  const [titles, setTitles] = useState(['']); // Initialize with one title input
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
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
      setSuccessMessage('');

      // Iterate over each file
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        const title = titles[index];

        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);

        const response = await fetch(`${import.meta.env.VITE_API_URL}/processInvoice`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) throw new Error('Network response was not successful.');
      }

      // Show a single success toast after all invoices are uploaded
      toast.success('Invoices uploaded successfully', { duration: 3000 }); // 3 seconds duration

      // Clear input fields after successful upload
      setFiles([null]);
      setTitles(['']);
    } catch (error) {
      console.error('Error uploading the invoices:', error);
      // Show error toast
      toast.error('Error uploading the invoices');
    } finally {
      setUploading(false);
    }
  };

  const handleNextPageClick = (data) => {
    navigate('/invoice-details', { state: { data } });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Überprüfen Sie Ihre Rechnungen</h2> {/* Translate "Compare with Delivery" */}
      <div className="row justify-content-between align-items-end">
        <div className="col-md-6"></div>

        <div className="col-md-6 d-flex justify-content-end">
          {/* <Link  to={'/Delivery-Bills'} className='btn btn-outline-primary align-items-center m-3'>Vergleichen mit Lieferung Rechnungen</Link>  */}
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-2"></div>
        <div className="col-md-10">
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
                    <BsX size={20} color="red" /> {/* Cross icon */}
                  </button>
                )}
              </div>
              <input
                type="file"
                onChange={(event) => handleFileChange(event, index)}
                className="form-control mb-2"
                accept=".pdf, image/*" // Accept both PDF and image files
                required
              />
            </div>
          ))}

          {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
          {successMessage && <div className="alert alert-success" role="alert">{successMessage}</div>}
          <button onClick={sendInvoiceData} className="btn btn-primary mb-3" disabled={uploading}>
            {uploading ? 'Wird hochgeladen...' : 'Rechnungen hochladen'} {/* Translate "Upload Invoices" */}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Edittool;
