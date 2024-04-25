import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Dashboard() {
  const [isListening, setIsListening] = useState(false);
  const [listeningText, setListeningText] = useState("");
  const [transcriptionText, setTranscriptionText] = useState("");
  const [transcriptionSummary, setTranscriptionSummary] = useState("");
  const [summary, setSummary] = useState("");
  const [file, setFile] = useState(null);
  const [transcribing, setTranscribing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [summaryError, setSummaryError] = useState("");
  const [isEmailButtonVisible, setIsEmailButtonVisible] = useState(false);
  const [date, setDate] = useState(""); // For Datum
  const [theme, setTheme] = useState(""); // For Thema
  const [partnerNumber, setPartnerNumber] = useState(""); // For Gesellschafter
  const [branchManager, setBranchManager] = useState(""); // For Niederlassungsleiter
  const [participants, setParticipants] = useState(""); // For Teilnehmer
  const [author, setAuthor] = useState(""); // For Verfasser
  const navigate = useNavigate();

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "de-DE"; // Set language to German

      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () =>
        console.log("Spracherkennung aktiviert. Bitte sprechen.");

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");
        setListeningText(transcript);
      };

      recognition.onerror = (event) =>
        console.error("Fehler bei der Erkennung:", event.error);

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
      formData.append("audio", file);

      try {
        setTranscribing(true);
        setErrorMessage("");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/transcribe`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok)
          throw new Error("Netzwerkantwort war nicht erfolgreich.");

        const data = await response.json();

        setTranscriptionText(
          data.transcription.results.channels[0].alternatives[0].transcript
        );
        setTranscriptionSummary(data.summary);
      } catch (error) {
        console.error("Fehler beim Transkribieren der Datei:", error);
        setErrorMessage("Fehler beim Transkribieren der Datei.");
      } finally {
        setTranscribing(false);
      }
    } else {
      setErrorMessage("Bitte wählen Sie zuerst eine Datei aus.");
    }
  };

  const handleGenerateSummary = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/generateSummary`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recordedText: listeningText }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate summary.');
      }

      const data = await response.json();
      setSummary(data.summary);

      // Show email button after generating summary
      setIsEmailButtonVisible(true);
    } catch (error) {
      console.error('Error generating summary:', error);
      setSummaryError('Error generating summary.');
    }
  };

  const handleFileChange = (event) => setFile(event.target.files[0]);

  const handleNextPageClickTranscription = () => {
    navigate("/transcription", {
      state: {
        text: transcriptionText,
        summary: transcriptionSummary,
      },
    });
  };

  const handleNextPageClickListening = () => {
    navigate("/Recorded-text-mail", {
      state: {
        listeningText: listeningText,
        summary: summary,
      },
    });
  };

  const handleStopListening = () => {
    // Stop listening
    setIsListening(false);

    // Generate summary when listening stops
    handleGenerateSummary();
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Protokoll</h2>
      <div className="row justify-content-center m-3">
        <div className="col-md-12">

       
          <div className="d-flex justify-content-between">
            <Link
              to={"/List"}
              className="btn btn-secondary"
              style={{ marginLeft: "12rem" }}
            >
              Werkzeuge
            </Link>
            <Link to={"/Record-mail"} className="btn btn-secondary ">
              Vorherige Historie
            </Link>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-2"></div>
        <div className="col-md-10">
        
          <input
            type="file"
            onChange={handleFileChange}
            className="form-control mb-3"
            required
          />
          <div style={{ color: "red", marginTop: "5px", fontSize: "14px" }}>
            {errorMessage}
          </div>
          <button
            onClick={handleTranscribeClick}
            className="btn btn-primary btn-block mb-3"
            disabled={transcribing}
          >
            {transcribing ? "Bitte warten..." : "Transkribieren"}
          </button>

          {transcriptionText && (
            <div className="card mt-3">
              <div className="card-body">
                <h5 className="card-title">Transkription</h5>
                <p className="card-text">{transcriptionText}</p>
                <h5 className="card-title mt-4">Zusammenfassung</h5>
                <p className="card-text">{transcriptionSummary}</p>
                <button
                  onClick={handleNextPageClickTranscription}
                  className="btn btn-outline-secondary btn-block"
                >
                  Per E-Mail senden
                </button>
              </div>
            </div>
          )}

          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Spracherkennung</h5>
              <p className="card-text">
                {listeningText ||
                  "Beginnen Sie zu sprechen oder laden Sie Ihre Sprache hoch, um sie hier zu transkribieren."}
              </p>

              {summaryError && (
                <div
                  style={{ color: "red", marginTop: "5px", fontSize: "14px" }}
                >
                  {summaryError}
                </div>
              )}
              {summary && (
                <div>
                  <h5 className="mt-3">Zusammenfassung:</h5>
                  <p className="card-text">{summary}</p>
                </div>
              )}
              {!isListening && (
                <div>
                  <button
                    onClick={handleGenerateSummary}
                    className="btn btn-secondary mt-3 me-1"
                  >
                    Zusammenfassung generieren
                  </button>
                  {isEmailButtonVisible && ( // Conditionally render email button
                    <button
                      onClick={handleNextPageClickListening}
                      className="btn btn-outline-secondary mt-3"
                    >
                      Per E-Mail senden
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => setIsListening(!isListening)}
            className={`btn ${
              isListening ? "btn-danger" : "btn-success"
            } btn-block mb-3`}
          >
            {isListening
              ? "Spracherkennung stoppen"
              : "Spracherkennung starten"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
