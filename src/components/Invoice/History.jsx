import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


function InvoiceHistory() {
  const [invoiceHistory, setInvoiceHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInvoiceHistory();
  }, []);

  const fetchInvoiceHistory = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/invoiceHistory`
      );
      const data = await response.json();
      console.log(data);
      setInvoiceHistory(data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const handleRowClick = (entry) => {
    navigate(`/Details-with-date/${entry.upload_date}`);
  };

  const handleDeleteInvoice = async (uploadDate) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/deleteInvoicesByUploadDate/${uploadDate}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        await fetchInvoiceHistory();
        toast.success("Rechnungen erfolgreich gelöscht");

      } else {
        console.error("Failed to delete invoices.");
      }
    } catch (error) {
      console.error("Error deleting invoices:", error);
    }
  };
  
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          {/* Potential sidebar content can be added here */}
        </div>

        <div className="col-md-8" style={{ padding: "50px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h1 style={{ margin: "0", flexGrow: 1, textAlign: "center" }}>
              Rechnungshistorie
            </h1>
            <Link
              to={"/Delivery-Bills"}
              className="btn btn-secondary"
              style={{ cursor: "pointer" }}
            >
              Zurück
            </Link>
          </div>

          <div
            className="table-responsive shadow-sm rounded mt-3"
            style={{ backgroundColor: "white" }}
          >
            <table className="table table-hover">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Hochladedatum</th>
                  <th scope="col">Gesamtanzahl Rechnungen</th>
                  <th scope="col">Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {invoiceHistory.map((entry, index) => (
                  <tr
                    key={index}
                    onClick={() => handleRowClick(entry)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{entry.upload_date}</td>
                    <td>{entry.total_invoices}</td>
                    <td>
                    <button
  onClick={(e) => {
    e.stopPropagation(); // Prevent row click event
    handleDeleteInvoice(entry.upload_date);
  }}
  className="btn btn-danger"
>
  Löschen
</button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceHistory;
