const Client = require('../models/ClientModel');
const constants = require('../util/constants');

class ClientService {

  async save(client) {
    return await Client.create(client);
  }

  getClientPage = (client) => `${constants.clientMainUrlPage}${client.id}`;

}

module.exports = new ClientService();