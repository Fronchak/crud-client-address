const Category = require("../models/CategoryModel");

class CategoryService {

  save = async(category) => {
    return await Category.create(category);
  }

  findById = async(id) => {
    return await Category.findByPk(id);
  }

  findAll = async() => {
    return await Category.findAll();
  }

  update = async(category) => {
    return await category.save();
  }

  delete = async(category) => {
    await category.destroy();
  }
}

module.exports = new CategoryService();