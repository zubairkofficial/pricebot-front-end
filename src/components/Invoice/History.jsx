import React, { useState, useEffect } from 'react';

function InvoiceHistory() {
    const [invoiceHistory, setInvoiceHistory] = useState([]);

    useEffect(() => {
        fetchInvoiceHistory();
    }, []);

    const fetchInvoiceHistory = async () => {
        try {
            const response = await fetch('/api/invoice/history');
            const data = await response.json();
            setInvoiceHistory(data);
        } catch (error) {
            console.error('Error fetching invoice history:', error);
        }
    };

    return (
        <div>
            <h1>Invoice History</h1>
            <table>
                <thead>
                    <tr>
                        <th>Upload Date</th>
                        <th>Total Invoices</th>
                    </tr>
                </thead>
                <tbody>
                    {invoiceHistory.map((entry, index) => (
                        <tr key={index}>
                            <td>{entry.upload_date}</td>
                            <td>{entry.total_invoices}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default InvoiceHistory;
