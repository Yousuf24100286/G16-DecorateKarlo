'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const payment = sequelize.define('payment', {
    card_network: DataTypes.STRING,
    card_holder_name: DataTypes.STRING,
    card_number: DataTypes.STRING,
    card_expiry: DataTypes.STRING,
    card_cvv: DataTypes.STRING
  }, {});
  payment.associate = function(models) {
    // associations can be defined here
    payment.belongsTo(models.order_detail, {
      foreignKey: 'order_detail_id',
      as: 'order_detail'
    });
  }
  return payment;
};





















  // class payment extends Model {
  //   /**
  //    * Helper method for defining associations.
  //    * This method is not a part of Sequelize lifecycle.
  //    * The `models/index` file will call this method automatically.
  //    */
  //   static associate(models) {
  //     // define association here
  //   }
  // }
  // payment.init({
  //   user_id: DataTypes.INTEGER,
  //   card_network: DataTypes.STRING,
  //   card_holder_name: DataTypes.STRING,
  //   card_number: DataTypes.STRING,
  //   card_expiry: DataTypes.STRING,
  //   card_cvv: DataTypes.STRING
  // }, {
  //   sequelize,
  //   modelName: 'payment',
  // });
  // return payment;
