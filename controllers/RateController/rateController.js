import Product from "../../models/productModel.js";
import Rate from "../../models/rateModel.js";
import User from "../../models/userModel.js";

const rateProduct = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    const product = await Product.findOne({
      where: { id: req.params.productId },
    });
    if (product && user) {
      const checkRate = await getExistedRate(user.id, product.id);
      if (checkRate) {
        return res
          .status(400)
          .json({ message: "you already rated this product" });
      }

      await Rate.create({
        userId: user.id,
        productId: product.id,
        value: req.body.ratingValue,
      }).then(async () => {
        product.avgRating = getNewRateValue(
          product.avgRating,
          product.ratingsNum,
          req.body.ratingValue,
          product.ratingsNum + 1
        );

        product.ratingsNum = product.ratingsNum + 1;

        await product.save();
      });

      return res.status(201).json({ message: "Rating successfully " });
    }
    throw new Error("user or product not found");
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const editRating = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    const product = await Product.findOne({
      where: { id: req.params.productId },
    });
    const rate = await getExistedRate(user.id, product.id);

    if (rate && user && product) {
      const differenceRatingValue = req.body.ratingValue - rate.value;

      const result = getNewRateValue(
        product.avgRating,
        product.ratingsNum,
        differenceRatingValue,
        product.ratingsNum
      );

      product.avgRating = result;
      await product.save();

      rate.value = req.body.ratingValue;
      await rate.save();

      return res.json({ message: "rate updated successfully" });
    }
    return res.status(404).json({ message: "Unavailable data user, product " });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getProductRating = async (req, res) => {
  try {
    const data = await getExistedRate(req.user.id, req.params.productId);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const getExistedRate = async (userId, productId) => {
  return await Rate.findOne({
    where: {
      userId,
      productId,
    },
  });
};

const getNewRateValue = (avgRating, ratingsNum, ratingValue, newRatingsNum) => {
  return (avgRating * ratingsNum + ratingValue) / newRatingsNum;
};
export { rateProduct, editRating, getProductRating };
