const orderItemService = require("../services/OrderItemService");
const orderService = require('../services/OrderService');
const productService = require('../services/ProductService');
const {handleUndefinedError, handleNotFoundTest} = require('./ControllerFunctions');
const MyValidationError = require("../errors/MyValidationError");
const NotFoundError = require("../errors/NotFoundError");
const getCurrencyFormated = require("../util/getCurrencyFormated");

class OrderItemController {

  orderItem;

  getStore = async(req, res, next) => {
    this.renderForm(res, next);
  }

  renderForm = async(res, next, orderItem = {}) => {
    try {
      const products = await productService.findAll();
      res.locals.title = 'Add Item';
      res.render('orderItem/orderItemForm', {
        products
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
      res.redirect(`/orders/${newOrderItem.order_id}/items/${newOrderItem.product_id}`);
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

}

module.exports = new OrderItemController();