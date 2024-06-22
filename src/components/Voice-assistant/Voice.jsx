import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Select from "react-dropdown-select";

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
  const [departments, setDepartments] = useState([]);
  const [selectedDepartmentVoice, setSelectedDepartmentVoice] = useState(null);
  const [selectedDepartmentTranscription, setSelectedDepartmentTranscription] = useState(null);
  const [selectedPromptsVoice, setSelectedPromptsVoice] = useState("");
  const [selectedPromptsTranscription, setSelectedPromptsTranscription] = useState("");
  const [showDepartmentSelectionVoice, setShowDepartmentSelectionVoice] = useState(false);
  const [showDepartmentSelectionTranscription, setShowDepartmentSelectionTranscription] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showTranscriptionSummary, setShowTranscriptionSummary] = useState(false);
  const navigate = useNavigate();

  const userLoginId = localStorage.getItem("user_Login_Id");
  const userDepartments = JSON.parse(localStorage.getItem("Department") || "[]");

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

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/GetDepartments`);
        if (!response.ok) {
          throw new Error("Failed to fetch departments");
        }
        const data = await response.json();
        const filteredDepartments = data.filter(dept => userDepartments.includes(dept.name));
        setDepartments(filteredDepartments.map(dept => ({ label: dept.name, value: dept.prompt })));
      } catch (error) {
        console.error("Error fetching departments:", error.message);
      }
    };

    fetchDepartments();
  }, [userDepartments]);

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
        setShowDepartmentSelectionTranscription(true);
        setIsGenerateSummaryButtonVisible(true);
      } catch (error) {
        console.error("Fehler beim Transkribieren der Datei:", error);

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

  const handleGenerateSummaryVoice = async () => {
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
          prompts: selectedPromptsVoice
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to generate summary.");
      }

      const data = await response.json();
      setSummary(data.summary);
      setShowSummary(true);
      setIsEmailButtonVisible(true);
    } catch (error) {
      console.error("Error generating summary:", error);
      setSummaryError(error.message || "Error generating summary.");
    } finally {
      setIsSummaryGenerating(false);
    }
  };

  const handleGenerateSummaryTranscription = async () => {
    try {
      setIsSummaryGenerating(true);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/generateSummary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recordedText: transcriptionText,
          user_login_id: userLoginId,
          prompts: selectedPromptsTranscription
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to generate summary.");
      }

      const data = await response.json();
      setTranscriptionSummary(data.summary);
      setShowTranscriptionSummary(true);
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
        prompts: selectedPromptsTranscription
      },
    });
  };

  const handleNextPageClickListening = () => {
    navigate("/Recorded-text-mail", {
      state: {
        listeningText: listeningText,
        summary: summary,
        prompts: selectedPromptsVoice
      },
    });
  };

  const handleStopListening = () => {
    setIsListening(false);
    setShowDepartmentSelectionVoice(true);
    setIsGenerateSummaryButtonVisible(true);
  };

  const handleDepartmentChangeVoice = (values) => {
    if (values.length > 0) {
      const selectedPrompts = values[0].value;
      setSelectedPromptsVoice(selectedPrompts);
      setSelectedDepartmentVoice(values[0]);
    } else {
      setSelectedPromptsVoice("");
      setSelectedDepartmentVoice(null);
    }
  };

  const handleDepartmentChangeTranscription = (values) => {
    if (values.length > 0) {
      const selectedPrompts = values[0].value;
      setSelectedPromptsTranscription(selectedPrompts);
      setSelectedDepartmentTranscription(values[0]);
    } else {
      setSelectedPromptsTranscription("");
      setSelectedDepartmentTranscription(null);
    }
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
          {/* Voice Recording Section */}
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

              {showDepartmentSelectionVoice && (
                <div className="mt-3">
                  <h5>Wählen Sie Ihre Abteilungen aus</h5>
                  <Select
                    options={departments}
                    onChange={handleDepartmentChangeVoice}
                    values={selectedDepartmentVoice ? [selectedDepartmentVoice] : []}
                    multi={false}
                    placeholder="Wählen Sie eine Abteilung"
                    className="form-control"
                  />
                  {selectedPromptsVoice && (
                    <input
                      type="hidden"
                      className="form-control mt-3"
                      style={{ minHeight: "100px" }}
                      readOnly
                      value={selectedPromptsVoice}
                    />
                  )}
                </div>
              )}

              {summaryError && (
                <div style={{ color: "red", marginTop: "5px", fontSize: "14px" }}>
                  {summaryError}
                </div>
              )}
              {showSummary && (
                <div>
                  <h5 className="mt-3">Zusammenfassung:</h5>
                  <p className="card-text" style={{ whiteSpace: 'break-spaces' }}>{summary}</p>
                </div>
              )}
              {!isListening && isGenerateSummaryButtonVisible && showDepartmentSelectionVoice && (
                <div>
                  <button
                    onClick={handleGenerateSummaryVoice}
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
              if (isListening) {
                handleStopListening();
              } else {
                setIsListening(true);
                setIsEmailButtonVisible(false);
                setIsGenerateSummaryButtonVisible(false);
                setShowDepartmentSelectionVoice(false);
                setShowSummary(false);
              }
            }}
            className={`btn ${isListening ? "btn-danger" : "btn-success"} btn-block mb-3`}
          >
            {isListening ? "Spracherkennung stoppen" : "Spracherkennung starten"}
          </button>

          {/* Voice Transcription Section */}
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
                {showDepartmentSelectionTranscription && (
                  <div className="mt-3">
                    <h5>Wählen Sie Ihre Abteilungen aus</h5>
                    <Select
                      options={departments}
                      onChange={handleDepartmentChangeTranscription}
                      values={selectedDepartmentTranscription ? [selectedDepartmentTranscription] : []}
                      multi={false}
                      placeholder="Wählen Sie eine Abteilung"
                      className="form-control"
                    />
                    {selectedPromptsTranscription && (
                      <input
                        type="hidden"
                        className="form-control mt-3"
                        style={{ minHeight: "100px" }}
                        readOnly
                        value={selectedPromptsTranscription}
                      />
                    )}
                  </div>
                )}

                {showTranscriptionSummary && (
                  <div>
                    <h5 className="mt-3">Zusammenfassung:</h5>
                    <p className="card-text" style={{ whiteSpace: 'break-spaces' }}>{transcriptionSummary}</p>
                  </div>
                )}
                {showDepartmentSelectionTranscription && isGenerateSummaryButtonVisible && (
                  <div>
                    <button
                      onClick={handleGenerateSummaryTranscription}
                      className="btn btn-secondary mt-3 me-1"
                      disabled={isSummaryGenerating}
                    >
                      {isSummaryGenerating ? "Zusammenfassung wird generiert..." : "Zusammenfassung generieren"}
                    </button>
                    {isEmailButtonVisible && (
                      <button
                        onClick={handleNextPageClickTranscription}
                        className="btn btn-outline-secondary mt-3"
                      >
                        Per E-Mail senden
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
