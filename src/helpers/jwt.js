const jwt = require("jsonwebtoken");
const config = require("../config");

const generateAccessToken = (payload) => {
  return jwt.sign(payload, config.jwt.secret, { expiresIn: "2h" });
};

module.exports = {
  generateAccessToken,
};
