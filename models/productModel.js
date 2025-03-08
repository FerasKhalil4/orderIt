import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  avgRating: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  ratingsNum: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

export default Product;
