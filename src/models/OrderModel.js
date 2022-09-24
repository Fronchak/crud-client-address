const { Model, DataTypes } = require('sequelize');
const StaticOrderService = require('../services/StaticOrderService');
const constants = require('../util/constants');

module.exports = class Order extends Model {
  static init(sequelize) {
    super.init({
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: {
            msg: 'Invalid Date Format'
          }
        }
      },
      status: {
        type: DataTypes.ENUM,
        values: constants.paymentStatus
      },
      client_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'clients',
          key: 'id'
        },
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Client must be specified'
          }
        }
      },
      urlPage: {
        type: DataTypes.VIRTUAL,
        get() {
          return StaticOrderService.getOrderUrlPage(this);
        }
      },
      urlDeletePage: {
        type: DataTypes.VIRTUAL,
        get() {
          return StaticOrderService.getOrderUrlDeletePage(this);
        }
      },
      urlUpdatePage: {
        type: DataTypes.VIRTUAL,
        get() {
          return StaticOrderService.getOrderUrlUpdatePage(this);
        }
      },
      urlCreateItem: {
        type: DataTypes.VIRTUAL,
        get() {
          return StaticOrderService.getOrderItemUrlCreatePage(this);
        }
      },
      dateFormatted: {
        type: DataTypes.VIRTUAL,
        get() {
          return StaticOrderService.getDateFormatted(this);
        }
      }
    }, {
      sequelize
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Client, {
      foreignKey: 'client_id'
    }); 
    this.belongsToMany(models.Product, {
      through: models.OrderItem
    });
    
  }
}