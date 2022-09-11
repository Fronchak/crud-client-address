module.exports = (req, res, next) => {
  res.locals.errors = [];
  res.locals.success = [];
  res.locals.title = '';
  res.locals.description = '';
  next();
}