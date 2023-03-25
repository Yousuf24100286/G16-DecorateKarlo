'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const order_item = sequelize.define('order_item', {
    order_id: DataTypes.INTEGER,
    product_variant_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {});
  order_item.associate = function(models) {
    // associations can be defined here
    order_item.belongsTo(models.orders, {
      foreignKey: 'order_id',
      as: 'order'
    });
    order_item.hasone(models.product_variant, {
      foreignKey: 'product_variant_id',
      as: 'product_variant'
    });
    
  };
  return order_item;
};














  // class order_item extends Model {
  //   /**
  //    * Helper method for defining associations.
  //    * This method is not a part of Sequelize lifecycle.
  //    * The `models/index` file will call this method automatically.
  //    */
  //   static associate(models) {
  //     // define association here
  //   }
  // }
  // order_item.init({
  //   order_id: DataTypes.INTEGER,
  //   product_variant_id: DataTypes.INTEGER,
  //   quantity: DataTypes.INTEGER
  // }, {
  //   sequelize,
  //   modelName: 'order_item',
  // });