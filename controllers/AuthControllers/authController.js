import User from "../../models/userModel.js";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

export const cookieOptions = {
  httpOnly: true,
  sameSite: "None",
  secure: true,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const login = async (req, res) => {
  console.log(req.body, "request");

  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const checkPassword = await compare(req.body.password, user.password);
    if (!checkPassword) {
      return res.status(404).json({ message: "Wrong Password" });
    }
    const accessToken = createAccessTokens(user.id, user.isAdmin);
    const refreshToken = createRefreshTokens(user.id, user.isAdmin);
    res.cookie("refreshToken", refreshToken, cookieOptions);

    return res.status(200).json({
      accessToken,
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("refreshToken");
    return res.json({ message: "logout" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const accessTokenRefresh = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  try {
    if (!refreshToken)
      return res.status(400).json({ message: "refresh token missing" });
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY,
      (err, user) => {
        if (err) return res.status(401);
        const accessToken = createAccessTokens(user.id, user.isAdmin);
        res.json({ accessToken, isAdmin: user.isAdmin });
      }
    );
  } catch (err) {
    return res.status(500);
  }
};

// tokens creation
const createAccessTokens = (id, isAdmin = false) => {
  return jwt.sign({ id, isAdmin }, process.env.ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: "15m",
  });
};

const createRefreshTokens = (id, isAdmin = false) => {
  return jwt.sign({ id, isAdmin }, process.env.REFRESH_TOKEN_SECRET_KEY, {
    expiresIn: "30d",
  });
};

export {
  login,
  logout,
  accessTokenRefresh,
  createAccessTokens,
  createRefreshTokens,
};
