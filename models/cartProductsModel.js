import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
import Cart from "./cartModel.js";
import Product from "./productModel.js";

const CartProducts = sequelize.define("CartProducts", {
  cartId: {
    type: DataTypes.INTEGER,
    references: {
      model: Cart,
      key: "id",
    },
    primaryKey: true,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: "id",
    },
    primaryKey: true,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  itemPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

Cart.belongsToMany(Product, {
  through: CartProducts,
  foreignKey: "cartId",
  as: "Products",
});

Cart.hasMany(CartProducts, {
  foreignKey: "cartId",
  as: "CartItems",
});

Product.belongsToMany(Cart, {
  through: CartProducts,
  foreignKey: "productId",
  as: "Carts",
});

CartProducts.belongsTo(Product, {
  foreignKey: "productId",
  as: "ProductDetails",
});
export default CartProducts;
