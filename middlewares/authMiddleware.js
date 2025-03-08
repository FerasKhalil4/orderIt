import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
      if (err)
        return res.status(401).json({ message: "Unauthorized token expired" });
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({
      message: "Unauthorized please provide the token in the headers",
    });
  }
};

const adminAuth = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Unauthorized admin access" });
  }
  next();
};

export { authJWT, adminAuth };
