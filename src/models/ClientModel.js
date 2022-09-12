const { DataTypes, Model } = require('sequelize');
const constants = require('../util/constants.js');
const StaticClientService  = require('../services/StaticClientService');

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
      },
      urlPage: {
        type: DataTypes.VIRTUAL,
        get() {
          return StaticClientService.getClientUrlPage(this);
        }
      },
      urlUpdatePage: {
        type: DataTypes.VIRTUAL,
        get() {
          return StaticClientService.getClientUpdatePage(this);
        }
      },
      urlDeletePage: {
        type: DataTypes.VIRTUAL,
        get() {
          return StaticClientService.getclientDeletePage(this);
        }
      },
      fullName: {
        type: DataTypes.VIRTUAL,
        get() {
          return StaticClientService.getClientFullName(this);
        }
      },
      birthDateFormatted: {
        type: DataTypes.VIRTUAL,
        get() {
          return StaticClientService.birthDateFormatted(this);
        }
      }
    }, {
      sequelize
    });
    return this;
  }
}