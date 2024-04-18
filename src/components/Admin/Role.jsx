import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const PromptSubmission = () => {
  const [prompt, setPrompt] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the prompt from the backend when the component mounts
    const fetchPrompt = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/getPromptFromDatabase`);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0 && data[0].prompt) {
            // Extract the prompt value from the first object in the array
            const fetchedPrompt = data[0].prompt;
            // Update the prompt state with the fetched prompt
            setPrompt(typeof fetchedPrompt === 'string' ? fetchedPrompt : '');
          } else {
            throw new Error('Ungültiges Format für Prompt-Daten');
          }
        } else {
          throw new Error('Fehler beim Abrufen des Prompts');
        }
      } catch (error) {
        console.error('Fehler beim Abrufen des Prompts:', error.message);
        setErrorMessage('Fehler beim Abrufen des Prompts.');
      }
    };
  
    fetchPrompt();
  }, []); // Führe den Effekt nur einmal aus, wenn die Komponente montiert wird

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/Prompt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
        }),
      });

      if (!response.ok) {
        throw new Error('Fehler beim Senden des Prompts');
      }

      // Reset prompt input
      setPrompt('');

      // Reset error message
      setErrorMessage('');

      // Zeige eine Erfolgsmeldung an und navigiere zum Admin-Panel
      toast.success('Prompt erfolgreich übermittelt');

      // Navigiere nach einer Verzögerung zum Admin-Panel
      setTimeout(() => {
        navigate('/admin');
      }, 2000); // Navigiere nach 2 Sekunden (2000 Millisekunden)
    } catch (error) {
      console.error('Fehler beim Senden des Prompts:', error.message);
      setErrorMessage('Fehler beim Senden des Prompts.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-2">
          {/* Seitenleisteninhalt */}
        </div>
        <div className="col-md-10">
          <form onSubmit={handleSubmit} className="container p-4 rounded shadow-sm bg-light">
            <h2 className="mb-4">Prompt einreichen</h2>
            {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
            <div className="mb-3">
              <label htmlFor="promptInput" className="form-label">Prompt</label>
              <textarea
                className="form-control"
                id="promptInput"
                name="prompt"
                value={prompt} // Zeige den abgerufenen Prompt-Wert hier an
                onChange={handleChange}
                required
                rows={10}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">Prompt einreichen</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PromptSubmission;
