import React from "react";

export const Compare = ({ selectedProducts }) => {
  if (selectedProducts.length === 0) {
    return <p>Please select products to compare.</p>;
  }

  return (
    <>
      <div className="product-comparison">
        <h2>Comparison</h2>
        <table>
          <thead>
            <tr>
              {selectedProducts.map((product) => (
                <th key={product.id}>{product.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {selectedProducts.map((product) => (
                <td key={product.id}>{product.price}</td>
              ))}
            </tr>
            <tr>
              {selectedProducts.map((product) => (
                <td key={product.id}>{product.features}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
