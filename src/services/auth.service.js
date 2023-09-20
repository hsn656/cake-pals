const bcrypt = require("bcryptjs");

const userModel = require("../models.js/user.model");
const ApiError = require("../error/api-error");
const { generateAccessToken } = require("../helpers/jwt");

const register = async ({ email, password, role, location }) => {
  const alreadyRegisteredUSer = await userModel
    .findOne({ email }, { _id: 1 })
    .lean();

  if (alreadyRegisteredUSer) throw ApiError.badRequest("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  return await userModel.create({
    email,
    password: hashedPassword,
    role,
    ...(location && {
      location: {
        type: "Point",
        coordinates: location,
      },
    }),
  });
};

const login = async ({ email, password }) => {
  const user = await userModel.findOne({ email }).lean();
  if (!user) throw ApiError.unAuthorized("Invalid credentials");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw ApiError.unAuthorized("Invalid credentials");
  return {
    accessToken: generateAccessToken({
      email,
      id: user._id,
      role: user.role,
    }),
  };
};

const profile = async ({ id }) => {
  return await userModel.findById(id);
};

module.exports = {
  register,
  login,
  profile,
};
