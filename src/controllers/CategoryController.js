const service = require('../services/CategoryService');
const NotFoundError = require('../errors/NotFoundError');
const MyValidationError = require('../errors/MyValidationError');
const {handleUndefinedError, handleNotFoundTest} = require('./ControllerFunctions');

class CategoryController {

  category;

  index = async(req, res, next) => {
    try {
      const categories = await service.findAll();
      res.locals.title = 'Categories List';
      res.render('category/categoryList', {
        categories
      });
    }
    catch (e) {
      this.handleError(e, res, next);
    }
  }

  getStore = (req, res) => {
    this.renderForm(res);
  }

  renderForm(res, category = {}) {
    res.locals.title = category.id ? 'Update Category' : 'Create Category'
    res.render('category/categoryForm', {
      category
    });
  }

  store = async(req, res, next) => {
    try {
      this.category = {};
      this.updateCategoryByValuesFromReq(this.category, req);
      const newCategory = await service.save(this.category);
      res.redirect(newCategory.urlPage);
    }
    catch (e) {
      this.handleError(e, res, next);
    }
  }

  updateCategoryByValuesFromReq(category, req) {
    category.category = req.body.category;
  }

  handleError(e, res, next) {
    if (e instanceof MyValidationError) {
      res.locals.errors = e.message.split(',');
      this.renderForm(res, this.category);
    }
    else if (e instanceof NotFoundError) {
      handleNotFoundTest(e, res, next);
    }
    else {
      handleUndefinedError(e, res, next);
    }
  }

  show = async(req, res, next) => {
    try {
      this.category = {};
      this.category = await service.findById(req.params.id);
      res.locals.title = 'Category Page';
      res.render('category/categoryPage', { category: this.category });
    }
    catch (e) {
      this.handleError(e, res, next);
    }
  }

  getUpdate = async(req, res, next) => {
    try {
      this.category = {};
      this.category = await service.findById(req.params.id);
      this.renderForm(res, this.category);
    }
    catch (e) {
      this.handleError(e, res, next);
    }
  }

  update = async(req, res, next) => {
    try {
      this.category = {};
      this.category = await service.findById(req.params.id);
      this.updateCategoryByValuesFromReq(this.category, req);
      const updatedCategory = await service.update(this.category);
      res.redirect(updatedCategory.urlPage);
    }
    catch (e) {
      this.handleError(e, res, next);
    }
  }

  getDelete = async(req, res, next) => {
    try {
      this.category = {};
      this.category = await service.findById(req.params.id);
      res.locals.title = 'Delete Category';
      res.render('category/categoryDelete', { category: this.category });
    }
    catch (e) {
      this.handleError(e, res, next);
    }
  }

  delete = async(req, res, next) => {
    try {
      await service.deleteById(req.params.id);
      res.redirect('/categories');
    }
    catch (e) {
      this.handleError(e, res, next);
    }
  }
}

module.exports = new CategoryController();