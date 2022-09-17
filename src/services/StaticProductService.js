const constants = require('../util/constants');
const getCurrencyFormated = require('../util/getCurrencyFormated');

module.exports.getProductUrlPage = (product) => {
  return `${constants.productMainUrlPage}${product.id}`;
}

module.exports.getProductUpdateUrlPage = (product) => {
  return `${constants.productUpdateUrlPage}${product.id}`;
}

module.exports.getProductDeleteUrlPage = (product) => {
  return `${constants.productDeleteUrlPage}${product.id}`
}

module.exports.getCurrency = (product) => {
  return getCurrencyFormated(product.price);
}
