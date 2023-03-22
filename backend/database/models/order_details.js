'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const order_details = sequelize.define('order_details', {
    user_id: DataTypes.INTEGER,
    total: DataTypes.DECIMAL,
    delivery_address_id: DataTypes.INTEGER,
    payment_method: DataTypes.STRING,
    payment_id: DataTypes.INTEGER,
    order_status: DataTypes.STRING
  }, {});
  order_details.associate = function(models) {
    // associations can be defined here
    order_details.belongsTo(models.users, {
      foreignKey: 'user_id',
      as: 'user'
    });
    order_details.hasMany(models.order_items, {
      foreignKey: 'order_id',
      as: 'order_items'
    });
    order_details.belongsTo(models.delivery_address, {
      foreignKey: 'delivery_address_id',
      as: 'delivery_address'
    });
    order_details.belongsTo(models.payment, {
      foreignKey: 'payment_id',
      as: 'payment'
    });
  };
  
};
















  // class order_details extends Model {
  //   /**
  //    * Helper method for defining associations.
  //    * This method is not a part of Sequelize lifecycle.
  //    * The `models/index` file will call this method automatically.
  //    */
  //   static associate(models) {
  //     // define association here
  //   }
  // }
  // order_details.init({
  //   user_id: DataTypes.INTEGER,
  //   total: DataTypes.DECIMAL,
  //   delivery_address_id: DataTypes.INTEGER,
  //   payment_method: DataTypes.STRING,
  //   payment_id: DataTypes.INTEGER,
  //   order_status: DataTypes.STRING
  // }, {
  //   sequelize,
  //   modelName: 'order_details',
  // });
  // return order_details;
