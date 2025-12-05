import { db } from "../db";



export const createVendorProductTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS vendor_products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      price DECIMAL(10,2) NOT NULL,
      image VARCHAR(255),
      createdBy INT NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;
  db.query(query, (err, result) => {
    if (err) console.error(err);
    else console.log("VendorProduct table ready");
  });
};
