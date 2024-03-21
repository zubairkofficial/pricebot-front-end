import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import * as XLSX from "xlsx";

const ShowData = () => {
  const location = useLocation();
  const comparedData = location.state || [];
  const navigate = useNavigate();

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(comparedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "ComparedData");
    XLSX.writeFile(wb, "comparedData.xlsx");
    navigate("/"); // Navigate after download
  };

  const handleApprove = () => {
    downloadExcel(); // Directly calling downloadExcel includes the approved action
  };

  const handleReject = () => {
    navigate("/");
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 "  >
         
        </div>
        <div className="col-md-9">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center" style={{ textAlign: "center" }}>
                Compared Data
              </h2>
            </div>
            <div className="card-body">
              <table
                className="table table-bordered table-hover"
               
              >
                <thead className="table-dark">
                  <tr>
                    <th scope="col">#</th>{" "}
                    {/* Add a header for the index column */}
                    <th scope="col">EAN</th>
                    <th scope="col">Previous Price</th>
                    <th scope="col">Updated Price</th>
                    <th scope="col">Product Name</th>
                  </tr>
                </thead>
                <tbody>
                  {comparedData.length > 0 ? (
                    comparedData.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>{" "}
                        {/* Display the index + 1 for each row */}
                        <td>{item.EAN}</td>
                        <td>{item["Previous Price"]}</td>
                        <td>{item["Updated Price"]}</td>
                        <td>{item["Product Name"]}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No data found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="text-center" style={{ textAlign: "center" }}>
                <button
                  onClick={handleApprove}
                  className="btn btn-success mx-2"
                >
                  Approve
                </button>
                <button
                  onClick={handleReject}
                  className="btn btn-danger mx-2"
                  style={{ marginLeft: "10px" }}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowData;
