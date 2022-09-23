const Client = require('../models/ClientModel');
const Address = require('../models/AddressModel');
const NotFoundError = require('../errors/NotFoundError');
const MyValidationError = require('../errors/MyValidationError');
const {isValidationError, getErrors} = require('./ServiceFunctions');

class ClientService {

  save = async (client) => {
    try {
      return await Client.create(client);
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

  async findById(id) {
    const client = await Client.findByPk(id);
    if (!client) throw new NotFoundError('Client');
    return client;
  }

  async findByIdWithAddress(id) {
    const client = await Client.findByPk(id, {
      include: Address
    });
    if (!client) throw new NotFoundError('Client');
    return client;
  }

  async findAll() {
    return await Client.findAll();
  }

  async findAllWithAddress() {
    return await Client.findAll({
      include: Address
    });
  }

  update = async (client) => {
    try {
      return await client.save();
    }
    catch (e) {
      this.handleError(e);
    }
  }

  async deleteById(id) {
    const rowsDeleted = await Client.destroy({
      where: { id: id }
    });
    if (rowsDeleted === 0) throw new NotFoundError('Client');
  }
}

module.exports = new ClientService();