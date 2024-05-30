const badRequestError = {
  code: 400,
  text: {
    message: "The data is invalid",
  },
};

const notFoundError = {
  code: 404,
  text: {
    message: "Not found",
  },
};

const conflictError = {
  code: 409,
  text: {
    message: "Duplicate key error",
  },
};

const unauthorizedError = {
  code: 401,
  text: {
    message: "Unauthorized",
  },
};

const ForbiddenError = {
  code: 403,
  text: {
    message: "Forbidden",
  },
};

module.exports = {
  badRequestError,
  notFoundError,
  conflictError,
  unauthorizedError,
  ForbiddenError,
};
