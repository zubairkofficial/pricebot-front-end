const renderExcelData = () => {
  const [showNAOnly, setShowNAOnly] = useState(false);

  const rows = excelData.combined_data ? excelData.combined_data.split("\n") : [];
  const excelRows = rows
    .map((row, index) => {
      const [ean, lp] = row.split(" ");
      const product = pdfData.data.find((item) => item.EAN === ean);

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
    })
    .filter((row) => showNAOnly || row.updatedPrice !== "N/A");

  // Styles
  const highlightedStyle = { backgroundColor: "#ffdddd" };
  const selectedStyle = { backgroundColor: "#89ABE3", color: "white" };
  const matchedStyle = { backgroundColor: "#ffffff" };
  const notMatchedStyle = { backgroundColor: "rgba(255, 0, 0, 0.1)" };
  const decimalLPStyle = { backgroundColor: "transparent" };
  const scrollBarStyle = {
    maxHeight: "800px",
    overflowY: "auto",
    scrollbarWidth: "thin",
    scrollbarColor: "#89ABE3 #f0f0f0",
    scrollbarTrackColor: "#f0f0f0",
  };

  // Render
  return (
    <div className="col-lg-6 mb-4" style={scrollBarStyle}>
      <div className="card shadow">
        <h5 className="card-header text-white bg-primary">
          Extracted Excel Data
          <button style={{ float: 'right', marginLeft: '10px' }} onClick={() => setShowNAOnly(!showNAOnly)}>
            {showNAOnly ? 'Show All' : 'Show N/A Only'}
          </button>
        </h5>
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
  {showNAOnly ? (
    // Show only N/A values in the "N/A Only" section
    excelRows
      .filter(row => row.updatedPrice === 'N/A')
      .map((row, index) => (
        <tr key={index} ref={isRowHighlighted(row.ean) ? highlightedRef : null}>
          <td>{row.ean}</td>
          <td>{parseFloat(row.lp)}</td>
          <td>{parseFloat(row.updatedPrice.replace(",", "."))}</td>
        </tr>
      ))
  ) : (
    // Show all values in the "All" section
    excelRows.map((row, index) => {
      const displayLP = parseFloat(row.lp) % 1 === 0 ? parseFloat(row.lp) : parseFloat(row.lp) * 100;
      const displayUpdatedPrice = parseFloat(row.updatedPrice.replace(",", ".")) * 100;

      const isDifferent = Math.round(displayLP) !== Math.round(displayUpdatedPrice);
      const applyDecimalLPStyle = parseFloat(row.lp) % 1 !== 0;

      const style = {
        ...(isDifferent ? notMatchedStyle : {}),
        ...(applyDecimalLPStyle ? decimalLPStyle : {}),
      };

      return (
        <tr key={index} style={style} ref={isRowHighlighted(row.ean) ? highlightedRef : null}>
          <td>{row.ean}</td>
          <td>{displayLP}</td>
          <td>{displayUpdatedPrice}</td>
        </tr>
      );
    })
  )}
</tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
