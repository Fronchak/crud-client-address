const { DataTypes, Model } = require('sequelize');
const StaticProductService = require('../services/StaticProductService');

module.exports = class Product extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
        unique: {
          msg: 'Produto já cadastrado'
        },
        validate: {
          len: {
            args: [2, 50],
            msg: `Product's name must have a least 2 letters`
          }
        },
        set(value) {
          this.setDataValue('name', value.trim());
        }
      },
      price: {
        type: DataTypes.FLOAT(7, 2)
      },
      urlPage: {
        type: DataTypes.VIRTUAL,
        get() {
          return StaticProductService.getProductUrlPage(this);
        }
      },
      urlDeletePage: {
        type: DataTypes.VIRTUAL,
        get() {
          return StaticProductService.getProductDeleteUrlPage(this);
        }
      },
      urlUpdatePage: {
        type: DataTypes.VIRTUAL,
        get() {
          return StaticProductService.getProductUpdateUrlPage(this);
        }
      },
      currency: {
        type: DataTypes.VIRTUAL,
        get() {
          return StaticProductService.getCurrency(this);
        }
      }
    }, {
      sequelize
    });
    return this;
  }
}
