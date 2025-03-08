import dotenv from "dotenv";
import app from "./app.js";
import sequelize from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

dotenv.config();

const PORT = process.env.PORT || 5000;

sequelize.sync({ force: false }).then(() => {
  console.log("Database is in synch");
  console.log("-------------------");

  console.log(`path is ${__dirname}`);
  console.log("-------------------");
  app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
  });
});
