module.exports = function getErrors(e) {
  return e.message.split(',').map(msg => msg.replace('Validation error: ', ''));
}