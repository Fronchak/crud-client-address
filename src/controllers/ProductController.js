const service = require('../services/ProductService');
const NotFoundError = require('../errors/NotFoundError');
const MyValidationError = require('../errors/MyValidationError');
const {handleUndefinedError, handleNotFoundTest} = require('./ControllerFunctions');

class ProductController {

  product;

  index = async (req, res, next) => {
    try {
      const products = await service.findAll();
      res.locals.title = 'All Products';
      res.render('product/productList', {
        products
      });
    }
    catch (e) {
      this.handleError(e, res, next);
    }
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

  getStore = (req, res) => {
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
      this.product = {};
      this.updateProductByValuesFromReq(this.product, req);
      this.product = await service.save(this.product);
      res.redirect(this.product.urlPage);
    }
    catch (e) {
      this.handleError(e, res, next);
    } 
  }

  updateProductByValuesFromReq(product, req) {
    product.name = req.body.name;
    product.price = req.body.price;
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
      handleUndefinedError(e, res, next);
    }
  }

  getUpdate = async (req, res, next) => {
    try {
      this.product = {};
      this.product = await service.findById(req.params.id);
      this.renderForm(res, this.product);
    }
    catch (e) {
      handleError(e);
    }
  }

  update = async (req, res, next) => {
    try {
      this.product = {};
      this.product = await service.findById(req.params.id);
      this.updateProductByValuesFromReq(this.product, req);
      const createdProduct = await service.update(this.product);
      res.redirect(createdProduct.urlPage);
    }
    catch (e) {
      this.handleError(e, res, next);
    }
  }

  getDelete = async (req, res, next) => {
    try {
      this.product = {};
      this.product = await service.findById(req.params.id);
      res.locals.title = 'Delete Product';
      res.render('product/productDelete', {
        product: this.product
      });
    }
    catch (e) {
      this.handleError(e, res, next);
    }
  }

  delete = async (req, res, next) => {
    try {
      await service.deleteById(req.params.id);
      res.redirect('/products');
    }
    catch (e) {
      this.handleError(e, res, next);
    }
  }
}

module.exports = new ProductController();