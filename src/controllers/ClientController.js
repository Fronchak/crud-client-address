class ClientController {

  index(req, res, next) {
    res.send('controller');
  }

  getStore(req, res, next) {
    res.send('getStore');
  }

  store(req, res, next) {
    res.send('store');
  }

  show(req, res, next) {
    res.send('show');
  }

  getUpdate(req, res, next) {
    res.send('getUpdate');
  }

  update(req, res, next) {
    res.send('update');
  }

  getDelete(req, res, next) {
    res.send('getDelete');
  }

  delete(req, res, next) {
    res.send('delete');
  }

}

export default new ClientController();