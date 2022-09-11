const { DataTypes, Model } = require('sequelize');
const constants = require('../util/constants.js');

module.exports = class Client extends Model {
  static init(sequelize) {
    super.init({
      firstName: {
        type: DataTypes.STRING,
        defaultValue: ''
      },
      lastName: {
        type: DataTypes.STRING,
        defaultValue: ''
      },
      email: {
        type: DataTypes.STRING,
        defaultValue: ''
      },
      birthDate: {
        type: DataTypes.DATE
      },
      status: {
        type: DataTypes.ENUM,
        values: constants.myStatus
      }
    }, {
      sequelize
    });
    return this;
  }
}