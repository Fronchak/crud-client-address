const { Model, DataTypes, VIRTUAL} = require('sequelize');
const StaticOrderItemService = require("../services/StaticOrderItemService");

module.exports = class OrderItem extends Model {
  static init(sequelize) {
    super.init({
      order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'orders',
          key: 'id'
        },
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Item shoud be referenced to some order.'
          }
        }
      },
      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'products',
          key: 'id'
        },
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Item shoud have a product'
          }
        }
      },
      price: {
        type: DataTypes.FLOAT(7, 2)
      },
      quantity: {
        type: DataTypes.INTEGER
      },
      urlUpdatePage: {
        type: VIRTUAL,
        get() {
          return StaticOrderItemService.getItemUpdateUrlPage(this);
        }
      },
      urlDeletePage: {
        type: VIRTUAL,
        get() {
          return StaticOrderItemService.getItemDeleteUrlPage(this);
        }
      }
    }, {
      sequelize
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Order, {
      foreignKey: 'order_id'
    });
    this.belongsTo(models.Product, {
      foreignKey: 'product_id'
    });
  }
}