const Category = require("../models/CategoryModel");

class CategoryService {

  save = async(category) => {
    return await Category.create(category);
  }

  findById = async(id) => {
    return await Category.findByPk(id);
  }
}

module.exports = new CategoryService();