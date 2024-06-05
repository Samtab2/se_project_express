class ErrorHandler {
  constructor(err, req, res, next) {
    this.err = err;
    this.req = req;
    this.res = res;
    this.next = next;
  }

  get statusCode() {
    return this.err.statusCode || 500;
  }

  get logging() {
    return this.err.logging;
  }

  static handle(err, req, res, next) {
    const errorHandler = new ErrorHandler(err, req, res, next);
    // implement error handling logic here
    res.status(errorHandler.statusCode).send({ error: errorHandler.logging });
  }
}

module.exports = ErrorHandler;