const {DataTypes, Model} = require('sequelize');
const service = require('../services/StaticAddressService');

module.exports = class Address extends Model {
  static init(sequelize) {
    super.init({
      city: {
        type: DataTypes.STRING,
        defaultValue: '',
        allowNull: false,
        validate: {
          len: {
            args: [2, 50],
            msg: 'City must be specified'
          }
        }
      },
      street: {
        type: DataTypes.STRING,
        defaultValue: '',
        allowNull: false,
        validate: {
          len: {
            args: [2, 60],
            msg: 'Street must be specified'
          }
        }
      },
      number: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
        validate: {
          len: {
            args: [1, 20],
            msg: `Address' number must be specified`
          }
        }
      },
      completeAddress: {
        type: DataTypes.VIRTUAL,
        get() {
          return service.getFullAddressName(this);
        }
      },
      urlPage: {
        type: DataTypes.VIRTUAL,
        get() {
          return service.getAddressUrlPage(this);
        }
      },
      urlUpdatePage: {
        type: DataTypes.VIRTUAL,
        get() {
          return service.getAddressUrlUpdatePage(this);
        }
      },
      urlDeletePage: {
        type: DataTypes.VIRTUAL,
        get() {
          return service.getAddressUrlDeletePage(this);
        }
      }
    }, {
      sequelize
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Client, {
      foreignKey: {
        allowNull: false,
        unique: true
      }
    });
  }
}