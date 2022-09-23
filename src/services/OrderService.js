const Order = require("../models/OrderModel");
const Client = require('../models/ClientModel');
const Product = require('../models/ProductModel');
const orderItemService = require('../services/OrderItemService');
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


  findByIdWithAssociation = async (id) => {
    const order = await Order.findByPk(id, {
      include: [Client, {
        model: Product,
        through: { attributes: ['price', 'quantity'] }
      }]
    });
    if (!order) throw new NotFoundError('Order');
    order.Products.forEach((product) => orderItemService.setSubtotal(product.OrderItem));
    this.setTotal(order);
    return order;
  }

  setTotal(order) {
    let total = 0;
    order.Products.forEach((product) => {
      total += product.OrderItem.subTotal;
    });
    order.total = total;
    console.log('setTotal:');
    console.log(order.total);
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