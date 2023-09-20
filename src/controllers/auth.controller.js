const tryCatchWrapper = require("../helpers/tryCatchWrapper");
const { formatSuccessRespnse } = require("../helpers/formatResponse");
const authService = require("../services/auth.service");

const register = tryCatchWrapper(async (req, res) => {
  const { email, password, role } = req.body;
  const result = await authService.register({ email, password, role });
  return res.status(201).json(formatSuccessRespnse(result));
});

const login = tryCatchWrapper(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login({ email, password });
  return res.status(201).json(formatSuccessRespnse(result));
});

const profile = tryCatchWrapper(async (req, res) => {
  const result = await authService.profile({ id: req.user.id });
  return res.status(201).json(formatSuccessRespnse(result));
});

module.exports = {
  register,
  login,
  profile
};
