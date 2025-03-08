import fs from "fs";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { getPaginatedData } from "../utilController/paginationController.js";

import Product from "../../models/productModel.js";

dotenv.config();

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);

const getProducts = async (req, res) => {
  const products = await getPaginatedData(
    Product,
    req.query,
    {
      isDeleted: false,
    },
    [["createdAt", "DESC"]]
  );
  if (products.err) {
    return res.status(500).json({ message: products.err });
  }
  return res.json(products);
};

const createProduct = async (req, res) => {
  try {
    const data = {
      ...req.body,
      image: req.file.filename,
    };
    const checkProduct = await Product.findOne({
      where: { name: data.name },
    });
    if (checkProduct) {
      if (checkProduct.isDeleted === true) {
        data.isDeleted = false;
        checkProduct.update(data);
        checkProduct.save();
        return res
          .status(201)
          .json({ message: "Product reAdded to the menu successfully" });
      }
      throw new Error("such product is already exists");
    }
    await Product.create(data)
      .then(() => {
        return res
          .status(201)
          .json({ message: "Product created successfully" });
      })
      .catch((err) => {
        throw new Error(err);
      });
  } catch (err) {
    invalidateFiles(req.file.filename);
    return res.status(400).json({ message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    if (!productId) {
      throw new Error("no id provided");
    }
    const [updatedProducts] = await Product.update(
      { isDeleted: true },
      {
        where: { id: req.params.id, isDeleted: false },
      }
    );
    if (updatedProducts === 0) {
      throw new Error("product not found or already deleted");
    }
    return res.status(204).json({ message: "product deleted successfully" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const getNewProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      limit: 3,
      order: [["createdAt", "DESC"]],
    });
    return res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getHighRatedProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      limit: 3,
      order: [["avgRating", "DESC"]],
    });
    return res.json(products);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export {
  createProduct,
  deleteProduct,
  getProducts,
  getNewProducts,
  getHighRatedProducts,
};

const invalidateFiles = (fileName) => {
  fs.unlink(
    path.join(__dirName + "../../../../public/uploads/images/", fileName),
    (err) => {
      if (err) console.log(err);
    }
  );
};
