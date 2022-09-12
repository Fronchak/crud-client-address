const getDateFormatted = require('../util/getDateFormatted');
const constants = require('../util/constants');

module.exports.getClientUrlPage = (client) => {
  return `${constants.clientMainUrlPage}${client.id}`;
}

module.exports.getClientUpdatePage = (client) => {
  return `${constants.clientUpdateUrlPage}${client.id}`;
}

module.exports.getclientDeletePage = (client) => {
  return `${constants.clientDeleteUrlPage}${client.id}`
}

module.exports.getClientFullName = (client) => {
  return `${client.firstName} ${client.lastName}`;
}

module.exports.birthDateFormatted = (client) => {
  return (client.birthDate) ? getDateFormatted(client.birthDate) : '';
}