import "./Invoice.css";
import { useParams } from "react-router-dom";

export const Invoice = () => {
  const { id } = useParams();

  return (
    <div className="invoice-container">
      <div className="invoice-inner">

        <div className="invoice-header">
          <h2>Invoice #{id}</h2>
          <h4>Date: 30 Nov 2024</h4>
        </div>

        <div className="invoice-top">
          <div>
            <h4>Invoice To</h4>
            <p>AliThemes Pty Ltd</p>
          </div>

          <div>
            <h4>Bill To</h4>
            <p>NestMart Inc</p>
          </div>
        </div>

        <div className="table-responsive">
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Unit</th>
                <th>Qty</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Organic Product</td>
                <td>$20</td>
                <td>2</td>
                <td>$40</td>
              </tr>

              <tr>
                <td colSpan="3" className="text-right f-w-600">SubTotal</td>
                <td>$40</td>
              </tr>

              <tr>
                <td colSpan="3" className="text-right f-w-600">Tax</td>
                <td>$5</td>
              </tr>

              <tr>
                <td colSpan="3" className="text-right f-w-600">Grand Total</td>
                <td>$45</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="invoice-btn-section">
          <button onClick={() => window.print()} className="btn-custom">
            Print Invoice
          </button>
        </div>

      </div>
    </div>
  );
};
