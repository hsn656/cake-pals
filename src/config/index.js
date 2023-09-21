const dotenv = require("dotenv");
dotenv.config();
const config = {
  app: {
    port: process.env.PORT || 5000,
  },
  db: {
    url: process.env.DB_URL || "mongodb://mongo:27017/cake-pals",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "not-jwt-secret",
  },
};

module.exports = config;
