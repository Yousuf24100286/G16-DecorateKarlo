'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    category_name: DataTypes.STRING,
    category_description: DataTypes.STRING
  }, {});
  category.associate = function(models) {
    // associations can be defined here
    category.hasMany(models.products, {
      foreignKey: 'category_id',
      as: 'products'
    });
  };
  return category;
  
};























// class category extends Model {
  //   /**
  //    * Helper method for defining associations.
  //    * This method is not a part of Sequelize lifecycle.
  //    * The `models/index` file will call this method automatically.
  //    */
  //   static associate(models) {
  //     // define association here
  //   }
  // }
  // category.init({
  //   category_name: DataTypes.STRING,
  //   category_description: DataTypes.STRING
  // }, {
  //   sequelize,
  //   modelName: 'category',
  // });
  // return category;