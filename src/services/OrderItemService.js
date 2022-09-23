const OrderItem = require("../models/OrderItemModel");
const Order = require("../models/OrderModel");
const Product = require('../models/ProductModel');
const NotFoundError = require('../errors/NotFoundError');
const MyValidationError = require('../errors/MyValidationError');
const {isValidationError, getErrors} = require('./ServiceFunctions');
const getCurrencyFormated = require("../util/getCurrencyFormated");

class OrderItemService {

  save = async(orderItem) => {
    try {
      return await OrderItem.create(orderItem);
    }
    catch (e) {
      this.handleError(e);
    }
  }

  handleError(e) {
    if (isValidationError(e)) {
      throw new MyValidationError(getErrors(e));
    }
    throw e;
  }

  findById = async(idOrder, idProduct) => {
    const orderItem = await OrderItem.findOne({
      where: {
        order_id: idOrder,
        product_id: idProduct
      },
      include: [Order, Product]
    });
    if (!orderItem) throw new NotFoundError('OrderItem');
    this.setSubtotal(orderItem);
    return orderItem;
  }

  setSubtotal(orderItem) {
    orderItem.subTotal = orderItem.price * orderItem.quantity;
  }

}

module.exports = new OrderItemService();