import sequelize from "./config/db.js";

async function getSchema() {
  const [results] = await sequelize.query(
    "SELECT name FROM sqlite_master WHERE type='table';"
  );
  console.log("Tables in database:", results);

  const list = await sequelize.query(`PRAGMA table_info(products);
   `);
  console.log(list);
}

getSchema().catch(console.error);
