import Product from "../../models/productModel.js";

const editPricing = async (req, res) => {
  try {
    const type = req.query.type;
    const value = req.body.value;
    if (type) {
      await changePrice(value, type);
      return res.json({ message: "products prices updated successfully" });
    }
    throw new Error("query not found");
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const changePrice = async (value, type) => {
  await Product.findAll({ where: { isDeleted: false } })

    .then((products) => {
      products.map(async (product) => {
        const changedVal = product.price * (value / 100);
        if (type === "add") {
          product.price += changedVal;
        } else if (type === "deduct") {
          changedVal < product.price
            ? (product.price -= changedVal)
            : (product.price = 0);
        } else return;

        await product.save();
      });
    })

    .catch((err) => {
      throw new Error({ error: err.message });
    });
};

export { editPricing };
