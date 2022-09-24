const orderItemService = require("../services/OrderItemService");
const orderService = require('../services/OrderService');
const productService = require('../services/ProductService');
const {handleUndefinedError, handleNotFoundTest} = require('./ControllerFunctions');
const controller = require('./OrderController');
const MyValidationError = require("../errors/MyValidationError");
const NotFoundError = require("../errors/NotFoundError");
const getCurrencyFormated = require("../util/getCurrencyFormated");

class OrderItemController {

  orderItem;

  getStore = async(req, res, next) => {
    this.renderForm(req, res, next);
  }

  renderForm = async(req, res, next, orderItem = {}) => {
    try {
      const order = await orderService.findByIdWithAssociation(req.params.idOrder);
      this.setOrderNumberFormat(order);
      const products = await productService.findAll();
      res.locals.title = 'Add Item';
      res.render('orderItem/orderItemForm', {
        products,
        order
      });
    }
    catch (e) {
      this.handleError(e, res, next);
    }
  }

  handleError = (e, res, next) => {
    console.log(e);
    next(e);
  }

  store = async(req, res, next) => {
    try {
      console.log(req.params.idOrder);
      console.log(req.body.product);
      const order = await orderService.findById(req.params.idOrder);
      const product = await productService.findById(req.body.product);
      this.orderItem = {};
      this.updateOrderItemFromValuesFromReq(this.orderItem, req);
      this.orderItem.product_id = product.id;
      this.orderItem.price = product.price;
      console.log(this.orderItem);
      const newOrderItem = await orderItemService.save(this.orderItem);
      console.log(newOrderItem.toJSON());
      res.redirect(`/orders/${newOrderItem.order_id}`);
    }
    catch (e) {
      this.handleError(e, res, next);
    }
  }

  updateOrderItemFromValuesFromReq(orderItem, req) {
    orderItem.order_id = req.params.idOrder;
    orderItem.quantity = req.body.quantity;
  }

  show = async(req, res, next) => {
    try {
      this.orderItem = {};
      this.orderItem = await orderItemService.findById(req.params.idOrder, req.params.idProduct);
      this.setNumberFormat(this.orderItem);
      res.locals.title = 'OrderItem'
      res.render('orderItem/orderItemPage', {
        orderItem: this.orderItem
      });

    }
    catch (e) {
      this.handleError(e, res, next);
    }
  }

  setNumberFormat(orderItem) {
    orderItem.priceFormatted = getCurrencyFormated(orderItem.price);
    orderItem.subTotalFormatted = getCurrencyFormated(orderItem.subTotal);
  }

  setOrderNumberFormat = (order) => {
    order.Products.forEach((product) => {
      this.setNumberFormat(product.OrderItem);
    });
    order.totalFormatted = getCurrencyFormated(order.total);
  }

}

module.exports = new OrderItemController();