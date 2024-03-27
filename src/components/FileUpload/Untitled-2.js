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
    const matchedStyle = { backgroundColor: "#ffffff" }; // For matched LP and Updated Price
    const notMatchedStyle = { backgroundColor: "rgba(255, 0, 0, 0.1)" }; // For LP and Updated Price not matched
    const decimalLPStyle = { backgroundColor: "red" }; // For LP values that come from decimal
    
    const scrollBarStyle = { // Custom scrollbar style
        maxHeight: "800px",
        overflowY: "auto",
        scrollbarWidth: "thin", // Width of the scrollbar
        scrollbarColor: "#89ABE3 #f0f0f0", // Color of the thumb and track
        scrollbarTrackColor: "#f0f0f0", // Color of the track
    };
    
    console.log("Excel Rows:", excelRows);
    
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
                                        style={
                                            isRowHighlighted(row.ean) 
                                            ? selectedStyle 
                                            : (
                                                parseFloat(row.lp) !== parseFloat(row.updatedPrice.replace(',', '.')) * 100 
                                                ? notMatchedStyle 
                                                : (parseFloat(row.lp) % 1 !== 0 ? decimalLPStyle : {})
                                            )
                                        }
                                        onClick={() => handleRowClick(row.ean)}
                                    >
                                        <td>{row.ean}</td>
                                        <td>{parseFloat(row.lp) % 1 === 0 ? row.lp : parseFloat(row.lp) * 100}</td>
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
}