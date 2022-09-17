module.exports.isValidationError = (e) => 
  (e.name === 'SequelizeValidationError' || e.name === 'SequelizeUniqueConstraintError');

module.exports.handleUndefinedError = (e, res, next) => {
  const err = new Error(e.message);
  err.status = 404;
  res.locals.err = err;
  next(e);
};

module.exports.handleNotFound = (res, description, next) => {
  const err = new Error(`${description} not found.`);
  err.status = 404;
  res.locals.err = err;
  next(err);
}

module.exports.handleNotFoundTest = (e, res, next) => {
  e.status = 404;
  res.locals.err = e;
  next(e);
}



module.exports.getErrors = (e) => e.errors.map((err) => err.message);

