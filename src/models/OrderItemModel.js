const { Model, DataTypes, VIRTUAL} = require('sequelize');

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
        type: DataTypes.FLOAT(7, 2),
        defaultValue: 0,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: 'Invalid price format'
          },
          min: {
            args: 0.5,
            msg: 'Price shoud be at least bigger than 0'
          }
        }
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isInt: {
            msg: 'Quantity shoud be a int number'
          },
          min: {
            args: 1,
            msg: 'Quantity cannot be lower than 1 unit'
          }
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