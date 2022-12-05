// delegate: async/await handler or middleware function.
// defaultStatus: optional parameter that allows to override the status code returned when delegate throws an error.
function asyncErrorBoundary(delegate, defaultStatus) {
  return(req,res, next) => {
    // Promise.resolve() - delegate(): value returned is guaranteed to have a catch() method.
    Promise.resolve()
      .then(() => delegate(req, res, next))
      .catch( (error = {}) => {
        const { status = defaultStatus, message = error } = error;
        next({
          status,
          message,
        })
      })
  }
}

module.exports = asyncErrorBoundary;