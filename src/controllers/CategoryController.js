const service = require('../services/CategoryService');

class CategoryController {

  index = async(req, res, next) => {
    res.send('index');
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
      next(e);
    }
  }

  show = async(req, res, next) => {
    try {
      const category = await service.findById(req.params.id);
      if (!category) return this.handleCategoryNotFound(res);
      this.renderCategoryPage(res, category);
    }
    catch (e) {
      next(e);
    }
  }

  handleCategoryNotFound(res) {
    const err = new Error('Category not found.');
    err.status = 404;
    res.locals.err = err;
    next();
  }

  renderCategoryPage(res, category) {
    res.locals.title = 'Category Page';
    res.render('category/categoryPage', { category });
  }

  getUpdate = async(req, res, next) => {
    res.send('getUpdate');
  }

  update = async(req, res, next) => {
    res.send('update');
  }

  getDelete = async(req, res, next) => {
    res.send('delete');
  }

  delete = async(req, res, next) => {
    res.send('delete');
  }
}

module.exports = new CategoryController();