const Sequelize = require('sequelize');
const config = require('../config/database.js');
const Client = require('../models/ClientModel.js');
const Address = require('../models/AddressModel.js');
const Category = require('../models/CategoryModel');

const connection = new Sequelize(config);
const models = [Client, Address, Category];
models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
//testConnection();
//updateTables();
async function testConnection() {
  try {
    await connection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

function updateTables() {
  connection.sync({ alter: true })
      .then(() => console.log('tabela criada'))
      .catch(e => console.log(e));
}




