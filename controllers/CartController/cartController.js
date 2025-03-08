import Cart from "../../models/cartModel.js";
import CartProducts from "../../models/cartProductsModel.js";
import Product from "../../models/productModel.js";
import User from "../../models/userModel.js";
import { getPaginatedData } from "../utilController/paginationController.js";

const createCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const userCheck = await User.findOne({ where: { id: userId } });
    const cartItems = req.body.cartItems;

    if (!userCheck) {
      throw new Error({ message: "user not found" });
    }

    const cart = await Cart.create({
      userId,
      total: req.body.amount,
    });

    cartItems.map(async (item) => {
      await CartProducts.create({
        cartId: cart.id,
        ...item,
      });
    });

    return res.json({ message: "purchase complete" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const getCarts = async (req, res) => {
  const include = [
    {
      model: CartProducts,
      as: "CartItems",
      include: [
        {
          model: Product,
          as: "ProductDetails",
        },
      ],
    },
  ];

  const carts = await getPaginatedData(
    Cart,
    req.query,
    { userId: req.user.id },
    [["createdAt", "DESC"]],
    include
  );
  console.log(carts);

  return res.json(carts);
};

export { createCart, getCarts };
