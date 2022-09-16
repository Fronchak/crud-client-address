const constants = require("../util/constants");

module.exports.getCategoryUrlPage = (category) => {
  return `${constants.categoryMainUrlPage}${category.id}`;
}

module.exports.getCategoryUrlDeletePage = (category) => {
  return `${constants.categoryDeleteUrlPage}${category.id}`;
}

module.exports.getCategoryUrlUpdatePage = (category) => {
  return `${constants.categoryUpdateUrlPage}${category.id}`;
}