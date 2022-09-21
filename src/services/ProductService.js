const Product = require('../models/ProductModel');
const Category = require('../models/CategoryModel');
const NotFoundError = require('../errors/NotFoundError');
const MyValidationError = require('../errors/MyValidationError');
const {isValidationError, getErrors} = require('./ServiceFunctions');


class ProductService {

  save = async (product) => {    
      try {
        return await Product.create(product);
      }
      catch (e) {
        this.handleError(e);
      }
  }

  handleError(e) {
    if (isValidationError(e)) {
      throw new MyValidationError(getErrors(e));
    }
    throw e;
  }

  findById = async (id) => {
    const product = await Product.findByPk(id, {
      attributes: ['id', 'name', 'price'],
      include: {
        model: Category, attributes: ['id', 'category']
      }
    });
    if (!product) throw new NotFoundError('Product');
    return product;
  }

  findAll = async () => {
    return await Product.findAll({ attributes: ['id', 'name', 'price'] });
  }

  deleteById = async (id) => {
    const rowsDeleted = await Product.destroy({
      where: {
        id: id
      }
    });
    if (rowsDeleted === 0) throw new NotFoundError('Product');
  }

  update = async (product) => {
    try {
      return await product.save();
    }
    catch (e) {
      this.handleError(e);
    }
  }

}

module.exports = new ProductService();