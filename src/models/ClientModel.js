import { DataTypes, Model } from 'sequelize';

export default class Client extends Model {
  static init(sequelize) {
    console.log('clinet');
    super.init({
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [2, 50],
            msg: 'Name must have more than 2 letters and less than 50 letters'
          },
          isAlpha: {
            msg: 'Name must have only letters'
          }
        }
      }
    }, {
      sequelize
    })
    return this;
  }
}