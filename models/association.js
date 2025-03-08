import Cart from "./cartModel.js";
import User from "./userModel.js";
import CartProducts from "./cartProductsModel.js";
import Product from "./productModel.js";

User.hasMany(Cart, { foreignKey: "userId" });
