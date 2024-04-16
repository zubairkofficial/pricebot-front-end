import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [isListening, setIsListening] = useState(false);
  const [listeningText, setListeningText] = useState('');
  const [transcriptionText, setTranscriptionText] = useState('');
  const [summary, setSummary] = useState('');
  const [file, setFile] = useState(null);
  const [transcribing, setTranscribing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();



  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'de-DE'; // Set language to German
  
      recognition.continuous = true;
      recognition.interimResults = true;
  
      recognition.onstart = () => console.log('Speech recognition activated. Please speak.');
  
      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        setListeningText(transcript);
      };
  
      recognition.onerror = (event) => console.error('Error during recognition:', event.error);
  
      if (isListening) {
        recognition.start();
      } else {
        recognition.stop();
      }
  
      return () => recognition.stop();
    }
  }, [isListening]);
  

  const handleListen = () => setIsListening(!isListening);


  const handleTranscribeClick = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('audio', file);

      try {
        setTranscribing(true);
        setErrorMessage('');

        const response = await fetch(`${import.meta.env.VITE_API_URL}/transcribe`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) throw new Error('Network response was not successful.');

        const data = await response.json();

        setTranscriptionText(data.transcription.results.channels[0].alternatives[0].transcript);
        setSummary(data.summary);
      } catch (error) {
        console.error('Error transcribing the file:', error);
        setErrorMessage('Error transcribing the file.');
      } finally {
        setTranscribing(false);
      }
    } else {
      setErrorMessage('Please choose a file first.');
    }
  };

  const handleFileChange = (event) => setFile(event.target.files[0]);

  const handleNextPageClick = () => {
    navigate('/transcription', { state: { text: transcriptionText, summary: summary } });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">ProtoKoll</h2>
      <div className="row justify-content-center">
        <div className="col-md-2"></div>
        <div className="col-md-10">
          <input type="file" onChange={handleFileChange} className="form-control mb-3" required />
          <div style={{ color: 'red', marginTop: '5px', fontSize: '14px' }}>{errorMessage}</div>
          <button onClick={handleTranscribeClick} className="btn btn-primary mb-3" disabled={transcribing}>
            {transcribing ? 'Please wait...' : 'Transcribe'}
          </button>

          {transcriptionText && (
            <div className="card mt-3">
              <div className="card-body">
                <h5 className="card-title">Transcription</h5>
                <p className="card-text">{transcriptionText}</p>
                <h5 className="card-title mt-4">Summary</h5>
                <p className="card-text">{summary}</p>
                <button onClick={handleNextPageClick} className="btn btn-outline-secondary">
                  Send Via Email
                </button>
              </div>
            </div>
          )}
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Speech Recognition</h5>
              <p className="card-text">{listeningText || "Start speaking or upload your speech to transcribe it here."}</p>
            </div>
          </div>
          <button onClick={() => setIsListening(!isListening)} className={`btn ${isListening ? 'btn-danger' : 'btn-success'} mb-3`}>
            {isListening ? 'Stop Speech Recognition' : 'Start Speech Recognition'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
