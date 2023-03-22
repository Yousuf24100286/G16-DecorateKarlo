'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const product_variant = sequelize.define('product_variant', {
    product_id: DataTypes.INTEGER,
    variant_attribute: DataTypes.STRING,
    variant_level: DataTypes.STRING,
    variant_price: DataTypes.INTEGER,
    variant_quantity: DataTypes.INTEGER
  }, {});
  product_variant.associate = function(models) {
    // associations can be defined here
    product_variant.belongsTo(models.product, {
      foreignKey: 'product_id',
      as: 'product'
    });
  };
  return product_variant;

  
};



















// class product_variant extends Model {
  //   /**
  //    * Helper method for defining associations.
  //    * This method is not a part of Sequelize lifecycle.
  //    * The `models/index` file will call this method automatically.
  //    */
  //   static associate(models) {
  //     // define association here
  //   }
  // }
  // product_variant.init({
  //   product_id: DataTypes.INTEGER,
  //   variant_attribute: DataTypes.STRING,
  //   variant_level: DataTypes.STRING,
  //   variant_price: DataTypes.INTEGER,
  //   variant_quantity: DataTypes.INTEGER
  // }, {
  //   sequelize,
  //   modelName: 'product_variant',
  // });
  // return product_variant;
