import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

const ListData = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pdfData, excelData } = location.state || { pdfData: [], excelData: [] };
  const [selectedEAN, setSelectedEAN] = useState(null);
  const highlightedRef = useRef(null);

 

  const downloadExcel = () => {
    const rows = excelData.combined_data ? excelData.combined_data.split("\n") : [];
    const combinedRows = rows.map(row => {
      const [ean, lp] = row.split(" ");
      const updatedPrice = eanToEkPreisMap[ean] || lp; // Use LP if updated price not available
      const product = pdfData.data.find(item => item.EAN === ean);

      return product ? {
        ean,
        "Previous Price": lp,
        "Updated Price": updatedPrice,
        productName: product.Artikelbezeichnung
      } : null;
    }).filter(row => row !== null);

    const ws = XLSX.utils.json_to_sheet(combinedRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "ComparedData");
    XLSX.writeFile(wb, "comparedData.xlsx");

    navigate("/");
  };

  useEffect(() => {
    if (highlightedRef.current) {
      highlightedRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [selectedEAN]);

  const handleRowClick = ean => {
    setSelectedEAN(ean);
  };

  const handleReject = () => {
    navigate("/");
  };
  const eanToEkPreisMap = pdfData.data.reduce((acc, item) => {
    acc[item.EAN] = item["EK Preis (netto)"];
    return acc;
  }, {});

  const isRowHighlighted = (ean) => ean === selectedEAN;

  // Create a map of EAN to "EK Preis (netto)"
  const scrollBarStyle = { // Custom scrollbar style
    maxHeight: "800px",
    overflowY: "auto",
    scrollbarWidth: "thin", // Width of the scrollbar
    scrollbarColor: "#89ABE3 #f0f0f0", // Color of the thumb and track
    scrollbarTrackColor: "#f0f0f0", // Color of the track
  };

  const renderPdfData = () => (
    <div className="col-lg-6 mb-4" style={scrollBarStyle} >
      <div className="card shadow">
        <h5 className="card-header text-white bg-primary">Extracted PDF Data</h5>
        <div className="card-body"  >
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>EAN Number</th>
                  <th>Price</th>
                  <th>Artikelbezeichnung</th>
                </tr>
              </thead>
              <tbody>
                {pdfData.data.map((item, index) => {
                  const bundPriceMatch = item.Artikelbezeichnung.match(/Bund\s+([\d.,]+)\s+€/);
                  const bundPrice = bundPriceMatch ? bundPriceMatch[1] : 'N/A';
  
                  const kartPriceMatch = item.Artikelbezeichnung.match(/(\d+,\d+)\s+€\s+\/\s+m\s+(\d+,\d+)\s+€\s+\/\s+m/);
                  const kartPrice = kartPriceMatch ? kartPriceMatch[1] : 'N/A';
  
                  const price = item["EK Preis (netto)"] ? item["EK Preis (netto)"] : item["Unverb. VK Preisempfehlung"];
  
                  return (
                    <tr
                      key={index}
                      ref={isRowHighlighted(item.EAN) ? highlightedRef : null}
                      className={`${isRowHighlighted(item.EAN) ? "table-primary" : ""}`}
                      onClick={() => handleRowClick(item.EAN)}
                    >
                      <td>{item.EAN}</td>
                      <td>{price ? parseFloat(price.replace(',', '.')) * 100 : (kartPrice !== 'N/A' ? parseFloat(kartPrice.replace(',', '.')) * 100 : parseFloat(bundPrice.replace(',', '.')) * 100)}</td>
                      <td>{item.Artikelbezeichnung}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
  
  
  
  
  
 
  const renderExcelData = () => {
    const rows = excelData.combined_data ? excelData.combined_data.split("\n") : [];
    const excelRows = rows.map((row, index) => {
      const [ean, lp] = row.split(" ");
      const product = pdfData.data.find(item => item.EAN === ean);
      
      let updatedPrice = "N/A";
  
      if (product) {
        if (product["EK Preis (netto)"]) {
          updatedPrice = product["EK Preis (netto)"];
        } else {
          const bundPriceMatch = product.Artikelbezeichnung.match(/Bund\s+([\d.,]+)\s+€/);
          if (bundPriceMatch) {
            updatedPrice = bundPriceMatch[1];
          } else {
            const kartPriceMatch = product.Artikelbezeichnung.match(/(\d+,\d+)\s+€\s+\/\s+m\s+(\d+,\d+)\s+€\s+\/\s+m/);
            if (kartPriceMatch) {
              updatedPrice = kartPriceMatch[1];
            }
          }
        }
      }
  
      return { ean, lp, updatedPrice };
    }).filter(row => row.updatedPrice !== "N/A");
  
    const highlightedStyle = { backgroundColor: "#ffdddd" }; // For general highlight
    const selectedStyle = { backgroundColor: "#89ABE3", color: "white" }; // For selected EAN (dark red)
    const scrollBarStyle = { // Custom scrollbar style
      maxHeight: "800px",
      overflowY: "auto",
      scrollbarWidth: "thin", // Width of the scrollbar
      scrollbarColor: "#89ABE3 #f0f0f0", // Color of the thumb and track
      scrollbarTrackColor: "#f0f0f0", // Color of the track
    };
    
    return (
      <div className="col-lg-6 mb-4" style={scrollBarStyle}>
        <div className="card shadow">
          <h5 className="card-header text-white bg-primary">Extracted Excel Data</h5>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>EAN Number</th>
                    <th>LP</th>
                    <th>Updated Price</th>
                  </tr>
                </thead>
                <tbody className="m-3">
                  {excelRows.map((row, index) => (
                    <tr
                      key={index}
                      ref={isRowHighlighted(row.ean) ? highlightedRef : null}
                      style={isRowHighlighted(row.ean) ? selectedStyle : highlightedStyle}
                      onClick={() => handleRowClick(row.ean)}
                    >
                      <td>{row.ean}</td>
                      <td>{row.lp}</td>
                      <td>{parseFloat(row.updatedPrice.replace(',', '.')) * 100}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };
  

  
  
  
  
  
  
  

  

  return (
    <div className="container mt-4">
    <div className="row"> {/* This row is for the overall layout */}
      {/* Sidebar column on the left */}
      <div className="col-md-3" style={{ paddingRight: 0 }}>
       
      </div>
  
      {/* Main content area */}
      <div className="col-md-9">
        <div className="row"> {/* This row is for your content */}
          {renderPdfData()}
          {renderExcelData()}
        </div>

        <div
        className="text-center"
        style={{ textAlign: "center", paddingTop: "6%" }}
      >
        <button onClick={downloadExcel} className="btn btn-success mx-2">
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
  );
};

export default ListData;
