const clientService = require('../services/clientService');
const clientController = require('./ClientController');
const addressService = require('../services/AddressService');
const getErrors = require('../util/getArrayOfErrorsMessage');

class AddressController {

  index = async(req, res, next) => {
    try {
      const addresses = await addressService.findAll();
      res.locals.title = 'Address List';
      res.render('address/addressList', {
        addresses
      });
    }
    catch (e) {
      next(e);
    }

  }

  getStore = async(req, res, next) => {
    try {
      const clients = await clientService.findAll();
      this.renderAddForm(res, clients);
    }
    catch (e) {
      next(e);
    }
  }

  renderAddForm = (res, clients, address) => {
    res.locals.title = 'Address Form'
    this.renderForm(res, clients, address);
  }

  renderForm(res, clients, address = {}) {
    res.render('address/addressForm', {
      clients: clients,
      address: address
    });
  } 

  store = async(req, res, next) => {
    let address;
    try {
      const client = await clientService.findById(req.body.client);
      if (!client) return this.handleClientNotFound(res);
      address = this.getAddressFromReq(req);
      const createdAddress = await addressService.save(address);
      res.redirect(createdAddress.urlPage);
    }
    catch (e) {
      let clients;
      try {
        clients = await clientService.findAll();
        return this.handleCreateError(e, res, next, clients, address);
      }
      catch (e) {
        return this.handleUndefinedError(e, res, next);
      }
    }
  }

  handleClientNotFound = (res) => {
    clientController.handleClientNotFound(res);
  }

  getAddressFromReq(req) {
    const body = req.body;
    return {
      city: body.city,
      street: body.street,
      number: body.number,
      ClientId: body.client
    };
  }

  handleCreateError = (e, res, next, clients, address) => {
    if (this.isValidationError(e)) {
      return this.handleValidationErrorAtCreation(e, res, clients, address);
    }
    return this.handleUndefinedError(e, res, next);
  }

  isValidationError = (e) => (e.name === 'SequelizeValidationError' || e.name === 'SequelizeUniqueConstraintError');

  handleValidationErrorAtCreation = (e, res, clients, address) => {
    res.locals.errors = getErrors(e);
    this.renderAddForm(res, clients, address);
  }

  handleUndefinedError(e, res, next) {
    const err = new Error(e.message);
    err.status = 404;
    res.locals.err = err;
    next(e);
  }

  getUpdate = async(req, res, next) => {
    try {
      const address = await addressService.findById(req.params.id);
      if (!address) return this.handleAddressNotFound(res);
      const clients = await clientService.findAll();
      return this.renderUpdateForm(res, clients, address);
    }
    catch (e) {
      next(e);
    }
  }

  renderUpdateForm = (res, clients, address) => {
    res.locals.title = 'Update Address';
    this.renderForm(res, clients, address);
  }

  update = async(req, res, next) => {
    let address;
    try {
      address = await addressService.findByIdOnlyAddress(req.params.id);
      if (!address) return this.handleAddressNotFound(res);
      this.updateAddressObjByReq(address, req);
      const updatedAddress = await addressService.update(address);
      res.redirect(updatedAddress.urlPage);
    }
    catch (e) {
      let clients;
      try {
        clients = await clientService.findAll();
        console.log(address.toJSON());
        return this.handleUpdateError(e, res, next, clients, address);
      }
      catch (e) {
        return this.handleUndefinedError(e, res, next);
      }
    }
  }

  updateAddressObjByReq(address, req) {
    const body = req.body;
    address.ClientId = body.client;
    address.city = body.city;
    address.street = body.street;
    address.number = body.number;
  }

  handleUpdateError = (e, res, next, clients, address) => {
    if (this.isValidationError(e)) {
      console.log('address 2', address.toJSON());
      return this.handleValidationErrorAtUpdate(e, res, clients, address);
    }
    return this.handleUndefinedError(e, res, next);
  }

  handleValidationErrorAtUpdate = (e, res, clients, address) => {
    res.locals.errors = getErrors(e);
    console.log('address 3', address.toJSON());
    console.log('clients', clients);
    this.renderUpdateForm(res, clients, address);
  }

  show = async(req, res, next) => {
    try {
      const address = await addressService.findById(req.params.id);
      if (!address) return this.handleAddressNotFound(res);
      return this.renderAddressPage(res, address);
    }
    catch (e) {
      next(e);
    }
  }

  handleAddressNotFound(res) {
    const err = new Error('Address not found.');
    err.status = 404;
    res.locals.err = err;
    next();
  }

  renderAddressPage(res, address) {
    res.locals.title = 'Address Page';
    res.render('address/addressPage', {
      address: address
    });
  }

  getDelete = async(req, res, next) => {
    try {
      const address = await addressService.findById(req.params.id);
      if (!address) return this.handleAddressNotFound(res);
      res.locals.title = "Delete Address";
      res.render('address/addressDelete', {
        address
      });
    }
    catch (e) {
      next(e);
    }
  }

  delete = async(req, res, next) => {
    try {
      const address = await addressService.findByIdOnlyAddress(req.params.id);
      if (!address) return this.handleAddressNotFound(res);
      await addressService.delete(address);
      res.redirect('/address');
    }
    catch (e) {
      next(e);
    }
  }

}

module.exports = new AddressController();