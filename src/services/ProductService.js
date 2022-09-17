const Product = require('../models/ProductModel');
const NotFoundError = require('../errors/NotFoundError');
const MyValidationError = require('../errors/MyValidationError');
const {isValidationError, getErrors} = require('./ServiceFunctions');


class ProductService {

  save = async (product) => {    
      try {
        const other = await Product.findOne({
          where: {
            name: product.name
          }
        });
        if (other) throw new MyValidationError('Product already registered');
        return await Product.create(product);
      }
      catch (e) {
        if (isValidationError(e)) {
          throw new MyValidationError(getErrors(e));
        }
        throw e;
      }
  }

  findById = async (id) => {
    const product = await Product.findByPk(id);
    if (!product) throw new NotFoundError('Product');
    return product;
  }

}

module.exports = new ProductService();