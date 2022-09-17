module.exports.isValidationError = (e) => 
  (e.name === 'SequelizeValidationError' || e.name === 'SequelizeUniqueConstraintError');

module.exports.getErrors = (e) => e.errors.map((err) => err.message);

