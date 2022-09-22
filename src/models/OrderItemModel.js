const { Model, DataTypes} = require('sequelize');

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
      }
    }, {
      sequelize,
      ignoreDuplicates: true
    });
    return this;
  }
}