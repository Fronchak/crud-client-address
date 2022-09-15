const parseDateToUTC = require('../util/parseDateToUTC');
const service = require('../services/ClientService');
const getErrors = require('../util/getArrayOfErrorsMessage');

class ClientController {

  index = async (req, res, next) => {
    try {
      const clients = await service.findAllWithAddress();
      clients.forEach((client) => {
        if (client.Address) {
          //console.log(typeof client.Address)
          ///console.log('------------------------------')
          console.log(client.Address.dataValues);
          console.log(client.Address.completeAddress);
          console.log(1);
        }
      });
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

  renderCreateForm(res, client = {}) {
    res.locals.title = 'Client';
    res.locals.description = 'Fill the form to add new client';
    res.locals.clientObj = client;
    res.render('client/clientForm');
  }

  store = async (req, res, next) => {
    const client = this.createClientFromReq(req);
    try {
      const clientCreated = await service.save(client);
      res.redirect(clientCreated.urlPage);
    }
    catch (e) {
      return this.handleCreateError(e, res, next, client);
    }
  }

  handleCreateError = (e, res, next, client) => {
    if (e.name === 'SequelizeValidationError' || e.name === 'SequelizeUniqueConstraintError')
       return this.handleValidationErrorAtCreation(e, res, client);
    this.handleUndefinedError(e, res, next);
  }

  handleValidationErrorAtCreation(e, res, client) {
    res.locals.errors = getErrors(e);
    this.renderCreateForm(res, client);
  }

  handleUndefinedError(e, res, next) {
    const err = new Error(e.message);
    err.status = 404;
    res.locals.err = err;
    next(e);
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
      const clientObj = await service.findByIdWithAddress(req.params.id);
      if (!clientObj) return this.handleClientNotFound(res);
      this.renderClientPage(clientObj, res);
    } catch (e) {
      this.handleUndefinedError(e, res, next);
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
      this.handleUndefinedError(e, res, next);
    }
  }

  renderUpdateForm(res, client) {
    res.locals.title = 'Update Client';
    res.locals.clientObj = client;
    res.render('client/clientForm');
  }

  update = async(req, res, next) => {
    let client;
    try {
      client = await service.findById(req.params.id);
      if (!client) return this.handleClientNotFound(res);
      this.updateClientByReq(client, req);
      const updatedClient = await service.update(client);
      this.renderClientPage(updatedClient, res);
    } 
    catch (e) {
      this.handleUpdateError(e, res, next, client);
    }
  }

  handleUpdateError = (e, res, next, client) => {
    if (e.name === 'SequelizeValidationError' || e.name === 'SequelizeUniqueConstraintError')
      return this.handleValidationErrorAtUpdate(e, res, client);
    this.handleUndefinedError(e, res, next);
  }

  handleValidationErrorAtUpdate(e, res, client) {
    res.locals.errors = getErrors(e);
    this.renderUpdateForm(res, client);
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
      await service.delete(client);
      res.redirect('/clients');
    }
    catch (e) {
      next(e);
    }
  }

}

module.exports = new ClientController();