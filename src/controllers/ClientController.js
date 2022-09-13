const parseDateToUTC = require('../util/parseDateToUTC');
const service = require('../services/ClientService');

class ClientController {

  index = async (req, res, next) => {
    try {
      const clients = await service.findAll();
      res.locals.title = 'All Clients';
      res.render('client/clientList', {
        clients: clients
      });
    } 
    catch (e) {
      next(e);
    }
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
    console.log(client);
    try {
      const clientCreated = await service.save(client);
      res.redirect(clientCreated.urlPage);
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

  show = async (req, res, next) => {
    try {
      const clientObj = await service.findById(req.params.id);
      if (!clientObj) return this.handleClientNotFound();
      this.renderClientPage(clientObj, res);
    } catch (e) {
      next(e);
    }
  }

  handleClientNotFound() {
    const err = new Error('Client not found.');
    err.status = 404;
    res.locals.err = err;
    next();
  }

  renderClientPage(clientObj, res) {
    res.locals.title = 'Client Personal Page'
    res.render('client/clientPage', {
      clientObj
    });
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