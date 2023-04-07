'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const discount = sequelize.define('discount', {
    discount_name: DataTypes.STRING,
    discount_description: DataTypes.TEXT,
    discount_percentage: DataTypes.INTEGER
  }, {});
  discount.associate = function(models) {
    // associations can be defined here
    discount.hasMany(models.products, {
      foreignKey: 'discount_id',
      as: 'products'
    });

  };
  
  return discount;
};



















  // class discount extends Model {
  //   /**
  //    * Helper method for defining associations.
  //    * This method is not a part of Sequelize lifecycle.
  //    * The `models/index` file will call this method automatically.
  //    */
  //   static associate(models) {
  //     // define association here
  //   }
  // }
  // discount.init({
  //   discount_name: DataTypes.STRING,
  //   discount_description: DataTypes.STRING,
  //   discount_percentage: DataTypes.INTEGER
  // }, {
  //   sequelize,
  //   modelName: 'discount',
  // });
  // return discount;