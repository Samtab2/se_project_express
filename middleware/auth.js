const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utlis/config");
const { UNAUTHORIZED } = require("../utlis/errors");


// eslint-disable-next-line consistent-return
const authorizationMiddleware = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        return res.status(UNAUTHORIZED.code).json({ message: "Unauthorized: Missing or invalid token" });
    }
    const token = authorizationHeader.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(UNAUTHORIZED.code).json({ message: "Unauthorized: Invalid token" });
        }
        req.user = payload;
        return next();
    });
};


module.exports = authorizationMiddleware