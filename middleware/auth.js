const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utlis/config");
const UnauthorizedError = require("../errors/unauthorized-err");

const authorizationMiddleware = (req, res, next) => {
  console.log("Missing or invalid Authorization header");
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    next(
      new UnauthorizedError({
        message: "Unauthorized: Missing or invalid token",
      })
    );
  }

  const token = authorizationHeader.replace("Bearer ", "");

  return jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      next(new UnauthorizedError({ message: "Unauthorized: Invalid token" }));
    }

    req.user = payload;
    return next();
  });
};

module.exports = authorizationMiddleware;
