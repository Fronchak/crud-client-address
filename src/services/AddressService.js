const Address = require('../models/AddressModel');
const Client = require('../models/ClientModel');

class AddressService {

  save = async (address) => {
    const createdAddress = await Address.create(address);
    return createdAddress.id;
  }

  async findById(id) {
    return await Address.findByPk(id, {
      include: Client
    });
  }

  async findByIdOnlyAddress(id) {
    return await Address.findByPk(id);
  }

  async findAll() {
    return await Address.findAll();
  }

  update = async(address) => {
    const updatedAddress = await address.save();
    return await this.findById(updatedAddress.id);
  }

  delete = async(address) => {
    return await address.destroy();
  }
}

module.exports = new AddressService();