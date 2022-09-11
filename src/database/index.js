const Sequelize = require('sequelize');
const config = require('../config/database.js');
const Client = require('../models/ClientModel.js');

const connection = new Sequelize(config);
Client.init(connection);
//testConnection();
async function testConnection() {
  try {
    await connection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
/*
connection.sync({ alter: true })
  .then(() => console.log('tabela criada'))
  .catch(e => console.log(e));
*/
