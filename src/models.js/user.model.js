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
      default: [],
    },
    overAllRating: { type: Number, default: 0 },
    availableFrom: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("User", userSchema);
