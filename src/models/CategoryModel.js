const {DataTypes, Model, Sequelize} = require('sequelize');
const StaticCategoryService = require('../services/StaticCategoryService');

module.exports = class Category extends Model {
  static init(sequelize) {
    super.init({
      category: {
        type: DataTypes.STRING,
        defaultValue: '',
        allowNull: false,
        unique: true,
        validate: {
          len: {
            args: [2, 50],
            msg: `Category's name must have at least 2 letters`
          }
        },
        set(value) {
          this.setDataValue('category', value.trim());
        }
      },
      urlPage: {
        type: Sequelize.VIRTUAL,
        get() {
          return StaticCategoryService.getCategoryUrlPage(this);
        }
      },
      urlUpdatePage: {
        type: DataTypes.VIRTUAL,
        get() {
          return StaticCategoryService.getCategoryUrlUpdatePage(this);
        }
      },
      urlDeletePage: {
        type: DataTypes.VIRTUAL,
        get() {
          return StaticCategoryService.getCategoryUrlDeletePage(this);
        }
      }
    }, {
      sequelize
    });
    return this;
  }
}