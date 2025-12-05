import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Product = sequelize.define("Product", {
  title: { type: DataTypes.STRING, allowNull: false },
  brand: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  category_id: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "categories", key: "id" },
  },
  oldPrice: { type: DataTypes.DECIMAL(10, 2) },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  stock: { type: DataTypes.INTEGER, defaultValue: 0 },
  images: { type: DataTypes.JSON },
  status: { type: DataTypes.ENUM("draft","published"), defaultValue: "draft" },
  is_popular: { type: DataTypes.BOOLEAN, defaultValue: false },
  vendorId: { type: DataTypes.INTEGER, allowNull: true }, // optional for admin
}, {
  timestamps: true
});

export default Product;
