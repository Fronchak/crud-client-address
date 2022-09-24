const orderItemService = require("../services/OrderItemService");
const orderService = require('../services/OrderService');
const productService = require('../services/ProductService');
const {
  handleUndefinedError, 
  handleNotFoundTest, 
  setItemNumberFormat, 
  setOrderFormat
} = require('./ControllerFunctions');
const MyValidationError = require("../errors/MyValidationError");
const NotFoundError = require("../errors/NotFoundError");

class OrderItemController {

  orderItem;

  getStore = async(req, res, next) => {
    this.renderForm(req, res, next);
  }

  renderForm = async(req, res, next, orderItem = {}) => {
    try {
      const order = await orderService.findByIdWithAssociation(req.params.idOrder);
      setOrderFormat(order);
      let products;
      if (orderItem.product_id) {
        const productsAux = await productService.findById(orderItem.product_id);
        products = [productsAux];
      }
      else {
        products = await productService.findAll();
      }
      res.locals.title = orderItem.product_id ? 'Update Item' : 'Add Item';
      res.render('orderItem/orderItemForm', {
        products,
        order,
        orderItem
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
      const order = await orderService.findById(req.params.idOrder);
      const product = await productService.findById(req.body.product);
      this.orderItem = {};
      this.updateOrderItemFromValuesFromReq(this.orderItem, req);
      this.orderItem.order_id = order.id;
      this.orderItem.product_id = product.id;
      this.orderItem.price = product.price;
      await orderItemService.save(this.orderItem);
      res.redirect(order.urlCreateItem);
    }
    catch (e) {
      this.handleError(e, res, next);
    }
  }

  updateOrderItemFromValuesFromReq(orderItem, req) {
    orderItem.quantity = req.body.quantity;
  }

  show = async(req, res, next) => {
    try {
      this.orderItem = {};
      this.orderItem = await orderItemService.findById(req.params.idOrder, req.params.idProduct);
      setItemNumberFormat(this.orderItem);
      res.locals.title = 'OrderItem'
      res.render('orderItem/orderItemPage', {
        orderItem: this.orderItem
      });

    }
    catch (e) {
      this.handleError(e, res, next);
    }
  }

  delete = async (req, res, next) => {
    try {
      const idOrder = req.params.idOrder;
      const idProduct = req.params.idProduct;
      await orderItemService.deleteById(idOrder, idProduct);
      res.redirect(`/orders/${idOrder}`);
    }
    catch (e) {
      this.handleError(e, res, next);
    }
  }

  getUpdate = async (req, res, next) => {
    try {
      const idOrder = req.params.idOrder;
      const idProduct = req.params.idProduct;
      this.orderItem = {};
      this.orderItem = await orderItemService.findById(idOrder, idProduct);
      //res.send(this.orderItem.toJSON());
      this.renderForm(req, res, next, this.orderItem);
    }
    catch (e) {
      this.handleError(e, res, next);
    }
  }

  update = async (req, res, next) => {
    try {
      const idOrder = req.params.idOrder;
      const idProduct = req.params.idProduct;
      this.orderItem = {};
      this.orderItem = await orderItemService.findById(idOrder, idProduct);
      this.updateOrderItemFromValuesFromReq(this.orderItem, req);
      this.orderItem.price = this.orderItem.Product.price;
      this.order_id = idOrder;
      this.product_id = idProduct;
      console.log(this.orderItem.toJSON());
      await orderItemService.update(this.orderItem);
      res.redirect(this.orderItem.Order.urlPage);

    }
    catch (e) {
      this.handleError(e, res, next);
    }
  }

}

module.exports = new OrderItemController();