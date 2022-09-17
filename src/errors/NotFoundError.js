module.exports = class NotFoundError extends Error {
  constructor(description) {
    console.log('passou pelo construtor');
    super(`${description} Not Found.`);
    this.name = 'NotFoundError';
    console.log('final do construtor');
  }
}