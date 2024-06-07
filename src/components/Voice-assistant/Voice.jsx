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
  const [isGenerateSummaryButtonVisible, setIsGenerateSummaryButtonVisible] = useState(false);
  const [isSummaryGenerating, setIsSummaryGenerating] = useState(false);
  const navigate = useNavigate();

  const userLoginId = localStorage.getItem("user_Login_Id");

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "de-DE";
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => console.log("Spracherkennung aktiviert. Bitte sprechen.");

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");
        setListeningText(transcript);
      };

      recognition.onerror = (event) => console.error("Fehler bei der Erkennung:", event.error);

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
      formData.append("user_login_id", userLoginId);

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

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || "Netzwerkantwort war nicht erfolgreich.");
        }

        const data = await response.json();

        setTranscriptionText(
          data.transcription.results.channels[0].alternatives[0].transcript
        );
        setTranscriptionSummary(data.summary);
      } catch (error) {
        console.error("Fehler beim Transkribieren der Datei:", error);

        // Parse the error message if it's JSON
        let errorMessage = "Fehler beim Transkribieren der Datei.";
        try {
          const errorJson = JSON.parse(error.message);
          if (errorJson.error) {
            errorMessage = errorJson.error;
          }
        } catch (jsonError) {
          errorMessage = error.message || errorMessage;
        }

        setErrorMessage(errorMessage);
      } finally {
        setTranscribing(false);
      }
    } else {
      setErrorMessage("Bitte wählen Sie zuerst eine Datei aus.");
    }
  };

  const handleGenerateSummary = async () => {
    try {
      setIsSummaryGenerating(true);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/generateSummary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recordedText: listeningText,
          user_login_id: userLoginId,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to generate summary.");
      }

      const data = await response.json();
      setSummary(data.summary);

      setIsEmailButtonVisible(true);
    } catch (error) {
      console.error("Error generating summary:", error);
      setSummaryError(error.message || "Error generating summary.");
    } finally {
      setIsSummaryGenerating(false);
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
    setIsListening(false);
    handleGenerateSummary();
    setIsEmailButtonVisible(true);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Protokoll</h2>
      <div className="row justify-content-center m-3">
        <div className="col-md-12">
          <div className="container d-sm-flex justify-content-end">
            <Link
              to={"/List"}
              className="btn btn-secondary mb-3 mb-sm-0"
              style={{ marginLeft: "12rem" }}
            >
              Werkzeuge
            </Link>
            <Link to={"/Record-mail"} className="btn btn-secondary ms-2">
              Vorherige Historie
            </Link>
          </div>
        </div>
      </div>
      <div className="row justify-content-center pt-3">
        <div className="col-md-2"></div>
        <div className="col-md-10">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Nehmen Sie Ihre Stimme auf</h5>
              {isListening || listeningText !== "" ? (
                <textarea
                  className="form-control"
                  style={{ minHeight: "100px" }}
                  readOnly={isListening}
                  value={listeningText}
                  onChange={(e) => setListeningText(e.target.value)}
                  placeholder="Beginnen Sie zu sprechen oder laden Sie Ihre Sprache hoch, um sie hier zu transkribieren."
                />
              ) : null}

              {summaryError && (
                <div style={{ color: "red", marginTop: "5px", fontSize: "14px" }}>
                  {summaryError}
                </div>
              )}
              {summary && (
                <div>
                  <h5 className="mt-3">Zusammenfassung:</h5>
                  <p className="card-text" style={{ whiteSpace: 'break-spaces' }}>{summary}</p>
                </div>
              )}
              {!isListening && isGenerateSummaryButtonVisible && (
                <div>
                  <button
                    onClick={handleGenerateSummary}
                    className="btn btn-secondary mt-3 me-1"
                    disabled={isSummaryGenerating}
                  >
                    {isSummaryGenerating ? "Zusammenfassung wird generiert..." : "Zusammenfassung generieren"}
                  </button>
                  {isEmailButtonVisible && (
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
            onClick={() => {
              setIsListening(!isListening);
              setIsEmailButtonVisible(false);
              setIsGenerateSummaryButtonVisible(true);
            }}
            className={`btn ${isListening ? "btn-danger" : "btn-success"} btn-block mb-3`}
          >
            {isListening ? "Spracherkennung stoppen" : "Spracherkennung starten"}
          </button>

          <h4 className="text-center p-3">Sprachaufzeichnung hochladen</h4>
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
                <textarea
                  className="form-control"
                  style={{ height: "200px" }}
                  value={transcriptionText}
                  onChange={(e) => setTranscriptionText(e.target.value)}
                ></textarea>
                <h5 className="card-title mt-4">Zusammenfassung</h5>
                {typeof transcriptionSummary === 'string' ? (
                  <p className="card-text" style={{ whiteSpace: 'break-spaces' }}>{transcriptionSummary}</p>
                ) : (
                  <p className="card-text" style={{ color: 'red' }}>Zusammenfassung konnte nicht erstellt werden.</p>
                )}
                <button
                  onClick={handleNextPageClickTranscription}
                  className="btn btn-outline-secondary btn-block"
                >
                  Per E-Mail senden
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
