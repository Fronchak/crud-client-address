const parseDateToUTC = require('../util/parseDateToUTC');
const service = require('../services/ClientService');

class ClientController {

  index(req, res, next) {
    res.send('controller');
  }

  getStore = (req, res) => {
    this.renderCreateForm(res);
  }

  renderCreateForm(res) {
    res.locals.title = 'Client';
    res.locals.description = 'Fill the form to add new client'
    res.render('client/clientForm');
  }

  store = async (req, res, next) => {
    const client = this.createClientFromReq(req);
    try {
      const clientCreated = await service.save(client);
      res.redirect(service.getClientPage(clientCreated));
    }
    catch (e) {
      next(e);
    }
  }

  handleCreateError(e) {
    //if (e.name === '') 
  }

  createClientFromReq(req) {
    const body = req.body;
    return {
      firstName: body.first_name,
      lastName: body.last_name,
      email: body.email,
      birthDate: parseDateToUTC(body.birth_date),
      status: body.status
    }
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

module.exports = new ClientController();