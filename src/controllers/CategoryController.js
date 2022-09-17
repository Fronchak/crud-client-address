const service = require('../services/CategoryService');
const {isValidationError, handleUndefinedError, handleNotFound, getErrors} = require('./ControllerFunctions');

class CategoryController {

  index = async(req, res, next) => {
    try {
      const categories = await service.findAll();
      res.locals.title = 'Categories List';
      res.render('category/categoryList', {
        categories
      });
    }
    catch (e) {
      handleUndefinedError(e, res, next);
    }
  }

  getStore = async(req, res, next) => {
    this.renderCreateForm(res);
  }

  renderCreateForm = (res, category = {}) => {
    res.locals.title = 'Create new Category';
    this.renderForm(res, category);
  } 

  renderForm(res, category) {
    res.render('category/categoryForm', {
      category
    });
  }

  store = async(req, res, next) => {
    const category = { category: req.body.category };
    try {
      const createdCategory = await service.save(category);
      res.redirect(createdCategory.urlPage);
    }
    catch (e) {
      this.handleErrorAtCreation(e, res, next, category);
    }
  }

  handleErrorAtCreation = (e, res, next, category) => {
    if (isValidationError(e)) {
      res.locals.errors = getErrors(e);
      this.renderCreateForm(res, category);
    }
    handleUndefinedError(e, res, next)
  }

  show = async(req, res, next) => {
    try {
      const category = await service.findById(req.params.id);
      if (!category) return this.handleCategoryNotFound(res, next);
      this.renderCategoryPage(res, category);
    }
    catch (e) {
      handleUndefinedError(e, res, next);
    }
  }

  handleCategoryNotFound(res, next) {
    handleNotFound(res, 'Category', next);
  }

  renderCategoryPage(res, category) {
    res.locals.title = 'Category Page';
    res.render('category/categoryPage', { category });
  }

  getUpdate = async(req, res, next) => {
    try {
      const category = await service.findById(req.params.id);
      if (!category) return this.handleCategoryNotFound(res, next);
      this.renderUpdateForm(res, category);
    }
    catch (e) {
      handleUndefinedError(e, res, next);
    }
  }

  renderUpdateForm = (res, category) => {
    res.locals.title = 'Update Category';
    this.renderForm(res, category);
  }

  update = async(req, res, next) => {
    let category;
    try {
      category = await service.findById(req.params.id);
      if (!category) return this.handleCategoryNotFound(res, next);
      category.category = req.body.category;
      await service.update(category);
      res.redirect(category.urlPage);
    }
    catch (e) {
      this.handleErrorAtUpdate(e, res, next, category);
    }
  }

  handleErrorAtUpdate = (e, res, next, category) => {
    if (isValidationError(e)) {
      res.locals.errors = getErrors(e);
      this.renderUpdateForm(res, category);
      return;
    }
    handleUndefinedError(e, res, next);
  }

  getDelete = async(req, res, next) => {
    try {
      const category = await service.findById(req.params.id);
      if (!category) return this.handleCategoryNotFound(res, next);
      res.locals.title = 'Delete Category';
      res.render('category/categoryDelete', { category });
    }
    catch (e) {
      handleUndefinedError(e, res, next);
    }
  }

  delete = async(req, res, next) => {
    try {
      const category = await service.findById(req.params.id);
      if (!category) return this.handleCategoryNotFound(res, next);
      await service.delete(category);
      res.redirect('/categories');
    }
    catch (e) {
      handleUndefinedError(e, res, next);
    }
  }
}

module.exports = new CategoryController();