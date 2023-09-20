const mongoose = require("mongoose");
const { rolesArray } = require("../config/constants");
const pointSchema = require("./point");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: rolesArray },
    location: {
      type: pointSchema,
    },
    ratings: {
      type: [
        {
          rate: { type: Number },
          user: { type: mongoose.Schema.ObjectId },
        },
      ],
      default: 0,
    },
    overAllRating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

userSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("User", userSchema);
