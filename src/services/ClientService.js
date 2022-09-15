const Client = require('../models/ClientModel');
const Address = require('../models/AddressModel');
const constants = require('../util/constants');

class ClientService {

  save = async (client) => {
    return await Client.create(client);
  }

  async findById(id) {
    return await Client.findByPk(id);
  }

  async findByIdWithAddress(id) {
    return await Client.findByPk(id, {
      include: Address
    });
  }

  async findAll() {
    return await Client.findAll();
  }

  async update(client) {
    return await client.save();
  }

  async delete(client) {
    return await client.destroy()
  }
}

module.exports = new ClientService();