const mongoose = require("mongoose");
const { rolesArray } = require("../config/constants");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {type: String, enum: rolesArray}
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);