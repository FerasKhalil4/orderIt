import User from "../../models/userModel.js";
import { hash } from "bcrypt";
import {
  createRefreshTokens,
  createAccessTokens,
  cookieOptions,
} from "../AuthControllers/authController.js";

import dotenv from "dotenv";
dotenv.config();

const createUser = async (req, res) => {
  try {
    const isAdmin = req.body.isAdmin ? true : false;
    const checkUser = await User.findOne({ where: { email: req.body.email } });
    if (checkUser) {
      return res.status(400).json({
        message: "such user with the same email already exist",
      });
    } else {
      const password = await hash(req.body.password, 10);
      const data = { ...req.body, password };
      const user = await User.create(data);
      const accessToken = createAccessTokens(user.id);
      const refreshToken = createRefreshTokens(user.id);

      res.cookie("refreshToken", refreshToken, cookieOptions);
      return res.status(201).json({
        message: "Registered Successfully",
        accessToken,
        isAdmin,
      });
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const getUsers = async (req, res) => {
  const users = await User.findAll();
  return res.status(200).json({ users });
};

const deleteUser = async (req, res) => {
  await User.destroy({ where: { id: req.params.id } }).then(() =>
    res.json({ message: "user deleted" })
  );
};
export { createUser, getUsers, deleteUser };
