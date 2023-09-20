const tryCatchWrapper = require("../helpers/tryCatchWrapper");
const { formatSuccessRespnse } = require("../helpers/formatResponse");
const bakerService = require("../services/baker.service");

const profile = tryCatchWrapper(async (req, res) => {
  const result = await bakerService.profile({
    id: req.params.id,
  });
  return res.status(200).json(formatSuccessRespnse(result));
});

module.exports = {
  profile,
};
