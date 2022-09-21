const Category = require("../models/CategoryModel");
const Product = require("../models/ProductModel");
const NotFoundError = require('../errors/NotFoundError');
const MyValidationError = require('../errors/MyValidationError');
const {isValidationError, getErrors} = require('./ServiceFunctions');

class CategoryService {

  save = async(category) => {
    try {
      return await Category.create(category);
    }
    catch (e) {
      this.handleError(e);
    }
  }

  handleError(e) {
    if (isValidationError(e)) {
      throw new MyValidationError(getErrors(e))
    }
    throw e;
  }

  findById = async(id) => {
    try {
      const category = await Category.findByPk(id, {
        attributes: ['id', 'category'],
        include: Product
      });
      if (!category) throw new NotFoundError('Category');
      return category;
    }
    catch (e) {
      this.handleError(e);
    }
  }

  findAll = async() => {
    return await Category.findAll({
      attributes: ['id', 'category']
    });
  }

  update = async(category) => {
    try {
      return await category.save();
    }
    catch (e) {
      this.handleError(e);
    }
  }

  deleteById = async(id) => {
    const rowsDeleted = await Category.destroy({
      where: {
        id: id
      }
    });
    if (rowsDeleted === 0) throw new NotFoundError('Category');
  }
}

module.exports = new CategoryService();