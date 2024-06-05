class ErrorHandler {
  constructor(err, req, res, next) {
    this.err = err;
    this.req = req;
    this.res = res;
    this.next = next;
  }
}

module.exports = ErrorHandler;
