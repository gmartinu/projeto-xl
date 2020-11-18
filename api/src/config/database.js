require("dotenv").config();
module.exports = {
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || null,
  database: process.env.DB_NAME || "teste",
  host: process.env.DB_HOSTNAME || "127.0.0.1",
  dialect: "mysql",
};
