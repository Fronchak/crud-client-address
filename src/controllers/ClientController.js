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
      if (!clientObj) return this.handleClientNotFound(res);
      this.renderClientPage(clientObj, res);
    } catch (e) {
      next(e);
    }
  }

  handleClientNotFound(res) {
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

  getUpdate = async (req, res, next) => {
    try {
      const client = await service.findById(req.params.id);
      if (!client) return this.handleClientNotFound(res);
      this.renderUpdateForm(res, client);
    }
    catch (e) {
      next(e);
    }
  }

  renderUpdateForm(res, client) {
    res.locals.title = 'Update Client';
    res.locals.clientObj = client;
    res.render('client/clientForm');
  }

  update = async(req, res, next) => {
    try {
      const client = await service.findById(req.params.id);
      if (!client) return this.handleClientNotFound(res);
      this.updateClientByReq(client, req);
      const updatedClient = await service.update(client);
      this.renderClientPage(updatedClient, res);
    } 
    catch (e) {
      next(e);
    }
  }

  updateClientByReq(client, req) {
    const body = req.body;
    client.firstName = body.first_name;
    client.lastName = body.last_name;
    client.email = body.email;
    client.birthDate = parseDateToUTC(body.birth_date);
    client.status = body.status;
  }

  getDelete = async (req, res, next) => {
    try {
      const client = await service.findById(req.params.id);
      if (!client) return this.handleClientNotFound(res);
      this.renderDeletePage(client, res);
    }
    catch (e) {
      next(e);
    }
  }

  renderDeletePage(client, res) {
    res.locals.title = "Confirm Delete";
    res.locals.clientObj = client;
    res.render('client/clientDeletePage');
  }

  delete = async (req, res, next) => {
    try {
      const client = await service.findById(req.params.id);
      if (!client) return this.handleClientNotFound(res);
      const rows = await service.delete(client);
      console.log('rows', rows.toJSON());
      res.redirect('/clients');
    }
    catch (e) {
      next(e);
    }
  }

}

module.exports = new ClientController();