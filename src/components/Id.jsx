import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar/Sidebar'; // Assuming you have a Sidebar component

const DataComparison = () => {
  const { id } = useParams();
  const [data, setData] = useState({ pdfData: [], excelData: {} });
  const [selectedEAN, setSelectedEAN] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { pdfData, excelData } = useState([]  )

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/getComparisonDataWithExcelData/${id}`)
      .then((response) => {
        console.log(response);
        setData({
          pdfData: JSON.parse(response.data.pdf_extracted_text),
          excelData: {
            title: response.data.excel_title,
            formattedData: response.data.excel_formatted_data,
          },
        });
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });

      
  }, [id]);

  const handleRowClick = (ean) => {
    setSelectedEAN(ean);
  };

  const isRowHighlighted = (ean) => ean === selectedEAN;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const renderPdfData = () => (
    <div className="col-lg-6 mb-4" style={{ maxHeight: '800px', overflowY: 'auto' }}>
      <div className="card shadow">
        <h5 className="card-header text-white bg-primary">Extracted PDF Data</h5>
        <div className="card-body">
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
                {data.pdfData.map((item, index) => {
                  // Extract the price based on the bundle or the 'Kart' price, falling back to the net price or the recommended retail price
                  const bundPriceMatch = item.Artikelbezeichnung.match(/Bund\s+([\d.,]+)\s+€/);
                  const bundPrice = bundPriceMatch ? bundPriceMatch[1] : 'N/A';
  
                  const kartPriceMatch = item.Artikelbezeichnung.match(/(\d+,\d+)\s+€\s+\/\s+m\s+(\d+,\d+)\s+€\s+\/\s+m/);
                  const kartPrice = kartPriceMatch ? kartPriceMatch[1] : 'N/A';
  
                  const price = item["EK Preis (netto)"] ? item["EK Preis (netto)"] : item["Unverb. VK Preisempfehlung"];
                  const finalPrice = price ? price : (kartPrice !== 'N/A' ? kartPrice : bundPrice);
  
                  return (
                    <tr
                      key={index}
                      // ref={isRowHighlighted(item.EAN) ?   null}
                      className={`${isRowHighlighted(item.EAN) ? "table-primary" : ""}`}
                      onClick={() => handleRowClick(item.EAN)}
                    >
                      <td>{item.EAN}</td>
                      <td>{finalPrice !== 'N/A' ? parseFloat(finalPrice.replace(',', '.')) * 100 : 'N/A'}</td>

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
 
  const eanToPriceMap = data.pdfData.reduce((acc, item) => {
    acc[item.EAN] = item["EK Preis (netto)"] || item["Unverb. VK Preisempfehlung"] || 'N/A';
    return acc;
  }, {});
  const renderExcelData = () => (
    <div className="col-lg-6 mb-4" style={{ maxHeight: '800px', overflowY: 'auto' }}>
      <div className="card shadow">
        <h5 className="card-header text-white bg-primary">Excel Data</h5>
        <div className="card-body">
          <p>Title: {data.excelData.title}</p>
          <p>Formatted Data: {data.excelData.formattedData}</p>
        </div>
      </div>
    </div>
  );
  //   return (
  //     <div className="col-lg-6 mb-4" style={{ maxHeight: '800px', overflowY: 'auto' }}>
  //       <div className="card shadow">
  //         <h5 className="card-header text-white bg-primary">Excel Data</h5>
  //         <div className="card-body">
  //           <div className="table-responsive">
  //             <table className="table">
  //               <thead>
  //                 <tr>
  //                   <th>EAN</th>
  //                   <th>LP</th>
  //                   <th>Updated Price</th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 {excelRows.map((row, index) => (
  //                   <tr key={index}>
  //                     <td>{row.EAN}</td>
  //                     <td>{row.LP}</td>
  //                     <td>{row.UpdatedPrice}</td>
  //                   </tr>
  //                 ))}
  //               </tbody>
  //             </table>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  
  



  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3">
       
        </div>
        <div className="col-md-9">
          <div className="row">
            {renderPdfData()}
            {renderExcelData()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataComparison;
