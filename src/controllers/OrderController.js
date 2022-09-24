const orderService = require('../services/OrderService');
const clientService = require('../services/ClientService');
const NotFoundError = require('../errors/NotFoundError');
const MyValidationError = require('../errors/MyValidationError');
const {handleUndefinedError, handleNotFoundTest, setOrderFormat} = require('./ControllerFunctions');
const constants = require('../util/constants');
const parseDateToUTC = require("../util/parseDateToUTC");

class OrderController {

  order;

  index = async(req, res, next) => {
    try {
      const orders = await orderService.findAll();
      res.locals.title = "Orders";
      res.render('order/orderList', {
        orders
      });
    }
    catch (e) {
      this.handleError(e, res, next);
    }
  }

  getStore = (req, res, next) => {
    this.renderForm(res, next);
  }

  renderForm = async(res, next, order = {}) => {
    try {
      const clients = await clientService.findAll();
      res.locals.title = order.id ? 'Update Order' : 'Add New Order';
      res.render('order/orderForm', {
        order,
        clients,
        statusList: constants.paymentStatus
      });
    }
    catch (e) {
      handleUndefinedError(e, res, next);
    }

  }

  store = async (req, res, next) => {
    try {
      this.order = {};
      this.updateOrderFromValuesFromReq(this.order, req);
      const newOrder = await orderService.save(this.order);
      res.redirect(newOrder.urlCreateItem);
    }
    catch (e) {
      this.handleError(e, res, next);
    }
  }

  updateOrderFromValuesFromReq(order, req) {
    order.client_id = req.body.client;
    order.status = req.body.status;
    order.date = parseDateToUTC(req.body.date);
  }

  handleError = async(e, res, next) => {
    if(e instanceof MyValidationError) {
      res.locals.errors = e.message.split(',');
      this.renderForm(res, next, this.order);
    }
    else if (e instanceof NotFoundError) {
      handleNotFoundTest(e, res, next);
    }
    handleUndefinedError(e, res, next);
  }

  show = async (req, res, next) => {
    try {
      this.order = {};
      this.order = await orderService.findByIdWithAssociation(req.params.id);
      setOrderFormat(this.order);
      res.locals.title = 'Order Page';
      res.render('order/orderPage', {
        order: this.order
      });
    }
    catch (e) {
      console.log(e.message);
      this.handleError(e, res, next);
    }
  }

  getUpdate = async (req, res, next) => {
    try {
      this.order = {};
      this.order = await orderService.findById(req.params.id);
      this.renderForm(res, next, this.order);
    }
    catch (e) {
      this.handleError(e, res, next);
    } 
  }

  update = async (req, res, next) => {
    try {
      this.order = {};
      this.order = await orderService.findById(req.params.id);
      this.updateOrderFromValuesFromReq(this.order, req);
      const updatedOrder = await orderService.update(this.order);
      res.redirect(updatedOrder.urlPage);
    }
    catch (e) {
      this.handleError(e, res, next);
    }
  }

  getDelete = async (req, res, next) => {
    try {
      this.order = {};
      this.order = await orderService.findById(req.params.id);
      res.locals.title = 'Delete Order';
      res.render('order/orderDelete', {
        order: this.order
      });
    }
    catch (e) {
      this.handleError(e, res, next);
    }
  }

  delete = async (req, res, next) => {
    try {
      await orderService.deleteById(req.params.id);
      res.redirect('/orders');
    }
    catch (e) {
      this.handleError(e, res, next);
    }
  }

}

module.exports = new OrderController();