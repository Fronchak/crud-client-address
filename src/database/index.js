import Sequelize from 'sequelize';
import config from '../config/database.js';
import Client from '../models/ClientModel.js';

const connection = new Sequelize(config);
Client.init(connection);
testConnection();
async function testConnection() {
  try {
    await connection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}


//Client.init(connection);

connection.sync({ alter: true })
  .then(() => console.log('tabela criada'))
  .catch(e => console.log(e));
