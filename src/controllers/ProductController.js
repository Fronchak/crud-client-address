

class ProductController {

  index = (req, res, next) => {
    res.send('index');
  }

  show = (req, res, next) => {
    res.send('show');
  }

  getStore = (req, res, next) => {
    res.send('getStore');
  }

  store = (req, res, next) => {
    res.send('store');
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