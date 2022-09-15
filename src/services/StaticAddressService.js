const constants = require('../util/constants');

module.exports.getAddressUrlPage = (address) => {
  return `${constants.addressMainUrlPage}${address.id}`;
}

module.exports.getAddressUrlUpdatePage = (address) => {
  return `${constants.addressUpdateUrlPage}${address.id}`;
}

module.exports.getAddressUrlDeletePage = (address) => {
  return `${constants.addressDeleteUrlPage}${address.id}`;
}

module.exports.getFullAddressName = (address) => {
  return `${address.city}: ${address.street} ${address.number}`;
}