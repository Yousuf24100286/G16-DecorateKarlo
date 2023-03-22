'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const cart_item = sequelize.define('cart_item', {
    session_id: DataTypes.INTEGER,
    product_variant_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {});
  cart_item.associate = function(models) {
    // associations can be defined here
    cart_item.belongsTo(models.product_variant, {
      foreignKey: 'product_variant_id',
      as: 'product_variant'
    });
    cart_item.belongsTo(model.cart_session, {
      foreignKey: 'session_id',
      as: 'cart_session'
    });
  };
  return cart_item;

  
};













// class cart_item extends Model {
  //   /**
  //    * Helper method for defining associations.
  //    * This method is not a part of Sequelize lifecycle.
  //    * The `models/index` file will call this method automatically.
  //    */
  //   static associate(models) {
  //     // define association here
  //   }
  // }
  // cart_item.init({
  //   session_id: DataTypes.INTEGER,
  //   product_variant_id: DataTypes.INTEGER,
  //   quantity: DataTypes.INTEGER
  // }, {
  //   sequelize,
  //   modelName: 'cart_item',
  // });
  // return cart_item;