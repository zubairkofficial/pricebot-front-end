import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsX } from 'react-icons/bs';
import toast from 'react-hot-toast';

function Edittool() {
  const [files, setFiles] = useState([null]);
  const [titles, setTitles] = useState(['']);
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState([null]);
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
    setFiles([...files, null]);
    setTitles([...titles, '']);
    setResults([...results, null]);
  };

  const handleRemoveFileInput = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    const newTitles = [...titles];
    newTitles.splice(index, 1);
    setTitles(newTitles);
    const newResults = [...results];
    newResults.splice(index, 1);
    setResults(newResults);
  };

  const sendInvoiceData = async () => {
    try {
      setUploading(true);
      setErrorMessage('');
      setSuccessMessage('');

      const newResults = [...results];

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

        const data = await response.json();
        newResults[index] = data.result;
      }

      setResults(newResults);
      toast.success('Rechnung erfolgreich prüfen', { duration: 3000 });

      setFiles([null]);
      setTitles(['']);
    } catch (error) {
      console.error('Error uploading the invoices:', error);
      toast.error('Fehler beim Hochladen der Rechnunge');
    } finally {
      setUploading(false);
    }
  };

  const closeResult = (index) => {
    const newResults = [...results];
    newResults[index] = null;
    setResults(newResults);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Überprüfen Sie Ihre Rechnungen</h2>
      <div className="row justify-content-between align-items-end">
        <div className="col-md-6"></div>
        <div className="col-md-6 d-flex justify-content-end"></div>
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
                    <BsX size={20} color="red" />
                  </button>
                )}
              </div>
              <input
                type="file"
                onChange={(event) => handleFileChange(event, index)}
                className="form-control mb-2"
                accept="image/*"
                required
              />
            </div>
          ))}
          {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
          {successMessage && <div className="alert alert-success" role="alert">{successMessage}</div>}
          <button onClick={sendInvoiceData} className="btn btn-primary mb-3" disabled={uploading}>
            {uploading ? 'Wird hochgeladen...' : 'Bild hochladen'}
          </button>
          {results.map((result, index) => (
            result && (
              <div
              key={index}
              className={`alert ${result === 'YES' ? 'alert-success' : 'alert-danger'} d-flex align-items-center justify-content-between shadow-sm rounded p-3 mb-3`}
              role="alert"
            >
              <span className="flex-grow-1">{result}</span>
              <button
                type="button"
                className="btn btn-link text-decoration-none"
                onClick={() => closeResult(index)}
                aria-label="Close"
              >
                <BsX size={20} color="black" />
              </button>
            </div>
            
            )
          ))}
        </div>
      </div>
    </div>
  );
}

export default Edittool;
