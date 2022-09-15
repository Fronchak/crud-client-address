const { DataTypes, Model } = require('sequelize');
const constants = require('../util/constants.js');
const StaticClientService  = require('../services/StaticClientService');

module.exports = class Client extends Model {
  static init(sequelize) {
    super.init({
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
        validate: {
          len: {
            args: [2, 40],
            msg: 'First name must have at least 2 letters and less than 40 letters'
          },
          isAlpha: {
            msg: 'First name must only contains letters'
          }
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
        validate: {
          len: {
            args: [2, 40],
            msg: 'Last name must have at least 2 letters and less than 40 letters'
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        defaultValue: '',
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: 'Invalid email format'
          }
        }
      },
      birthDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: {
            msg: 'Invalid date format'
          }
        }
      },
      status: {
        type: DataTypes.ENUM,
        values: constants.myStatus,
        allowNull: false,
        validate: {
          isIn: {
            args: [constants.myStatus],
            msg: `Invalid value for client's status`
          }
        }
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

  static associate(models) {
    this.hasOne(models.Address);
    
  }
}