const parseDateToUTC = require('../util/parseDateToUTC');
const service = require('../services/ClientService');
const getErrors = require('../util/getArrayOfErrorsMessage');
const NotFoundError = require('../errors/NotFoundError');
const MyValidationError = require('../errors/MyValidationError');
const {handleUndefinedError, handleNotFoundTest} = require('./ControllerFunctions');

class ClientController {

  client;

  index = async (req, res, next) => {
    try {
      const clients = await service.findAll();
      res.locals.title = 'All Clients';
      res.render('client/clientList', {
        clients
      });
    } 
    catch (e) {
      this.handleError(e, res, next);
    }
  }

  handleError(e, res, next) {
    if (e instanceof MyValidationError) {
      res.locals.errors = e.message.split(',');
      this.renderForm(res, this.client);
    }
    else if (e instanceof NotFoundError) {
      handleNotFoundTest(e, res, next);
    }
    else {
      handleUndefinedError(e, res, next);
    }
  }

  getStore = (req, res) => {
    this.renderForm(res);
  }

  renderForm(res, client = {}) {
    res.locals.title = client.id ? 'Update Client' : 'Create Client';
    res.render('client/clientForm', {
      clientObj: client
    });
  }

  store = async (req, res, next) => {
    try {
      this.client = {};
      this.updateClientFromValuesFromReq(this.client, req);
      const clientCreated = await service.save(this.client);
      res.redirect(clientCreated.urlPage);
    }
    catch (e) {
      this.handleError(e, res, next);
    }
  }

  updateClientFromValuesFromReq(client, req) {
    client.firstName = req.body.first_name;
    client.lastName = req.body.last_name;
    client.email = req.body.email;
    client.birthDate = parseDateToUTC(req.body.birth_date);
    client.status = req.body.status;
  }

  show = async (req, res, next) => {
    try {
      this.client = {};
      this.client = await service.findByIdWithAddress(req.params.id);
      res.locals.title = 'Client Page';
      res.render('client/clientPage', {
        clientObj: this.client
      });
    } 
    catch (e) {
      this.handleError(e, res, next);
    }
  }

  getUpdate = async (req, res, next) => {
    try {
      this.client = {};
      this.client = await service.findById(req.params.id);
      this.renderForm(res, this.client);
    }
    catch (e) {
      this.handleError(e, res, next);
    }
  }

  update = async(req, res, next) => {
    try {
      this.client = {};
      this.client = await service.findById(req.params.id);
      this.updateClientFromValuesFromReq(this.client, req);
      const updatedClient = await service.update(this.client);
      res.redirect(updatedClient.urlPage);
    } 
    catch (e) {
      this.handleError(e, res, next);
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
      this.client = {};
      this.client = await service.findById(req.params.id);
      res.locals.title = "Confirm Delete";
      res.render('client/clientDeletePage', { clientObj: this.client });
    }
    catch (e) {
      this.handleError(e);
    }
  }

  delete = async (req, res, next) => {
    try {
      await service.deleteById(req.params.id);
      res.redirect('/clients');
    }
    catch (e) {
      this.handleError(e);
    }
  }

}

module.exports = new ClientController();