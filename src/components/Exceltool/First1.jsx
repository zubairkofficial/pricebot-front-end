import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ExcelMerge = () => {
    const [qlikviewFile, setQlikviewFile] = useState(null);
    const [lagerbestandslisteFile, setLagerbestandslisteFile] = useState(null);
    const [downloadLink, setDownloadLink] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (e.target.name === 'qlikview') {
            setQlikviewFile(file);
        } else if (e.target.name === 'lagerbestandsliste') {
            setLagerbestandslisteFile(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!qlikviewFile || !lagerbestandslisteFile) {
            setErrorMessage('Bitte laden Sie beide Dateien hoch.');
            return;
        }

        const formData = new FormData();
        formData.append('qlikview', qlikviewFile);
        formData.append('lagerbestandsliste', lagerbestandslisteFile);

        setLoading(true);
        setDownloadLink(null);
        setErrorMessage('');
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/processDataAnalysis`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const { file, filename } = response.data;
            const link = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${file}`;
            setDownloadLink({ link, filename });
            toast.success('Die Datei ist fertig, bitte herunterladen');

        } catch (error) {
            console.error('There was an error merging the files!', error);
            setErrorMessage('Fehler beim Zusammenführen der Dateien. Bitte versuchen Sie es erneut.');
            toast.error('etwas ist schief gelaufen');
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = () => {
        
        setTimeout(() => {
            window.location.reload();
        }, 100);
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4 mt-5">Excel-Dateien zusammenführen</h2>
            <div className="row justify-content-center">
                <div className="col-md-2"></div>
                <div className="col-md-10">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Qlikview-Datei:</label>
                            <input
                                type="file"
                                name="qlikview"
                                onChange={handleFileChange}
                                className="form-control"
                                accept=".xlsx"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Lagerbestandsliste-Datei:</label>
                            <input
                                type="file"
                                name="lagerbestandsliste"
                                onChange={handleFileChange}
                                className="form-control"
                                accept=".xlsx"
                            />
                        </div>
                        {errorMessage && (
                            <div style={{ color: "red", marginTop: "5px", fontSize: "14px" }}>
                                {errorMessage}
                            </div>
                        )}
                        <button type="submit" className="btn btn-primary mb-3" disabled={loading}>
                            {loading ? 'Dateien zusammenführen...' : 'Dateien zusammenführen'}
                        </button>
                        {downloadLink && (
                            <a
                                href={downloadLink.link}
                                download={downloadLink.filename}
                                onClick={handleDownload}
                                className="btn btn-success ms-3 mb-3"
                            >
                                Datei herunterladen
                            </a>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ExcelMerge;
