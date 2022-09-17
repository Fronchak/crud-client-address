const service = require('../services/ProductService');
const NotFoundError = require('../errors/NotFoundError');
const MyValidationError = require('../errors/MyValidationError');
const {handleUndefinedError, handleNotFound, handleNotFoundTest} = require('./ControllerFunctions');

class ProductController {

  product;

  index = (req, res, next) => {
    res.send('index');
  }

  show = async (req, res, next) => {
    try {
      this.product = {};
      this.product = await service.findById(req.params.id);
      this.renderProductPage(res);
    }
    catch (e) {
      this.handleError(e, res, next);
    }
  }

  renderProductPage(res) {
    res.locals.title = 'Product Page';
    res.render('product/productPage', {
      product: this.product
    });
  }

  getStore = (req, res, next) => {
    this.renderForm(res);
  }

  renderForm(res, product = {}) {
    res.locals.title = product.id ? 'Update Product' : 'Create Product';
    res.render('product/productForm', {
      product
    });
  }

  store = async(req, res, next) => {
    try {
      this.product = null;
      this.product = this.getValuesFromReq(req);
      this.product = await service.save(this.product);
      res.redirect(this.product.urlPage);
    }
    catch (e) {
      this.handleError(e, res, next);
    } 
  }

  getValuesFromReq = (req) => {
    return {
      name: req.body.name,
      price: req.body.price
    };
  }

  handleError = (e, res, next) => {
    if (e instanceof MyValidationError) {
      res.locals.errors = e.message.split(',');
      this.renderForm(res, this.product);
    }
    else if (e instanceof NotFoundError) {
      handleNotFoundTest(e, res, next);
    }
    else {
      handleUndefinedError(e);
    }
  }

  getUpdate = (req, res, next) => {
    res.send('getUpdate');
  }

  update = (req, res, next) => {
    res.send('update');
  }

  getDelete = (req, res, next) => {
    res.send('getDelete');
  }

  delete = (req, res, next) => {
    res.send('delete');
  }
}

module.exports = new ProductController();