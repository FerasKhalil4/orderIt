import sequelize from "../config/db.js";
import User from "./userModel.js";
import Product from "./productModel.js";
import { DataTypes } from "sequelize";

const Rate = sequelize.define("Rate", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: "id",
    },
    allowNull: false,
  },
  value: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

User.belongsToMany(Product, { through: Rate, foreignKey: "userId" });
Product.belongsToMany(User, { through: Rate, foreignKey: "productId" });
Rate.belongsTo(Product, { foreignKey: "productId" });

export default Rate;
