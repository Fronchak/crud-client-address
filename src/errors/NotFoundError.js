module.exports = class NotFoundError extends Error {
  constructor(description) {
    super(`${description} Not Found.`);
    this.name = 'NotFoundError';
  }
}