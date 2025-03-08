import dotenv from "dotenv";
import app from "./app.js";
import sequelize from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

sequelize.sync({ force: false }).then(() => {
  console.log("Database is in synch");
  app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
  });
});
