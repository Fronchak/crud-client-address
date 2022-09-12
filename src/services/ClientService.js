const Client = require('../models/ClientModel');
const constants = require('../util/constants');

class ClientService {

  save = async (client) => {
    return await Client.create(client);
  }

  async findById(id) {
    return await Client.findByPk(id);
  }
}

module.exports = new ClientService();