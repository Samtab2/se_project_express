const NotFoundError = require("../errors/not-found-err");
const BadRequestError = require("../errors/bad-request-err");



module.exports.getProfile = (req, res, next) =>
  User.findOne({ _id: req.params.userId })
  .then((user) => {
    if (!user) {
      throw new NotFoundError('No user with matching ID found');
    }

    res.send(user);
  })
  .catch((err) => {
    if (err.name === "CastError") {
      throw new BadRequestError('The data is invalid');
    }
    next(err);
  });