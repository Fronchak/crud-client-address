const Order = require("../models/OrderModel");
const Client = require('../models/ClientModel');
const NotFoundError = require('../errors/NotFoundError');
const MyValidationError = require('../errors/MyValidationError');
const {isValidationError, getErrors} = require('./ServiceFunctions');


class OrderService {

  save = async(order) => {
    try {
      return await Order.create(order);
    }
    catch (e) {
      this.handleError(e);
    }
  }

  handleError(e) {
    if(isValidationError(e)) {
      throw new MyValidationError(getErrors(e));
    }
    throw e;
  }

  findById = async (id) => {
    const order = await Order.findByPk(id, {
      include: Client
    });
    if (!order) throw new NotFoundError('Order');
    return order;
  }

  findAll = async() => {
    return await Order.findAll();
  }

  update = async(order) => {
    try {
      const newOrder = await order.save();
      return await this.findById(newOrder.id);
    }
    catch (e) {
      this.handleError(e);
    }
  }

  deleteById = async(id) => {
    const rowsDeleted = await Order.destroy({
      where: {
        id: id
      }
    });
    if (rowsDeleted === 0) throw new NotFoundError('Order');
  }
}

module.exports = new OrderService();