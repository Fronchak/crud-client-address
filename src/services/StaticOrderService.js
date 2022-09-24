const constants = require("../util/constants");
const getDateFormatted = require('../util/getDateFormatted');

module.exports.getOrderUrlPage = (order) => {
  return `${constants.orderMainUrlPage}${order.id}`;
}

module.exports.getOrderUrlDeletePage = (order) => {
  return `${constants.orderDeleteUrlpage}${order.id}`;
}

module.exports.getOrderUrlUpdatePage = (order) => {
  return `${constants.orderUpdateUrlPage}${order.id}`;
}

module.exports.getDateFormatted = (order) => {
  return order.date ? getDateFormatted(order.date) : '';
}

module.exports.getOrderItemUrlCreatePage = (order) => {
  return `/orders/${order.id}/items/create`;
}