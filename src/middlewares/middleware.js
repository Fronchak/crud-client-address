const {myStatus} = require('../util/constants');

module.exports.globalMiddleware = (req, res, next) => {
  res.locals.errors = [];
  res.locals.success = [];
  res.locals.title = '';
  res.locals.description = '';
  next();
}

module.exports.clientFormMiddleware = (req, res, next) => {
  res.locals.clientObj = {};
  res.locals.statusList = myStatus;
  next();
}