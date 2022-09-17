module.exports = class MyValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'MyValidationError';
  };
}