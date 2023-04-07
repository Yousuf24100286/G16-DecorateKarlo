'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    product_name: DataTypes.STRING,
    product_description: DataTypes.TEXT,
    category_id: DataTypes.INTEGER,
    discount_id: DataTypes.INTEGER
  }, {});
  product.associate = function(models) {
    // associations can be defined here
    product.hasMany(models.product_variant, {
      foreignKey: 'product_id',
      as: 'product_variants'
    });
    product.hasMany(models.review, {
      foreignKey: 'product_id',
      as: 'reviews'
    });
    product.hasMany(models.product_images, {
      foreignKey: 'product_id',
      as: 'product_images'
    });
    product.belongsTo(models.category, {
      foreignKey: 'category_id',
      as: 'category'
    });
    product.hasone(models.discount, {
      foreignKey: 'discount_id',
      as: 'discount'
    });
  };

  return product;
};
































  // class product extends Model {
  //   /**
  //    * Helper method for defining associations.
  //    * This method is not a part of Sequelize lifecycle.
  //    * The `models/index` file will call this method automatically.
  //    */
  //   static associate(models) {
  //     // define association here
  //   }
  // }
  // product.init({
  //   product_name: DataTypes.STRING,
  //   product_description: DataTypes.STRING,
  //   category_id: DataTypes.INTEGER,
  //   discount_id: DataTypes.INTEGER
  // }, {
  //   sequelize,
  //   modelName: 'product',
  // });
  // return product;