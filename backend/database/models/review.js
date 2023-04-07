'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const review = sequelize.define('review', {
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    rating: DataTypes.INTEGER
  }, {});
  review.associate = function(models) {
    // associations can be defined here
    review.belongsTo(models.users, {
      foreignKey: 'user_id',
      as: 'user'
    });
    review.hasone(models.product, {
      foreignKey: 'product_id',
      as: 'product'
    });
  };
  return review;
};
















// class review extends Model {
  //   /**
  //    * Helper method for defining associations.
  //    * This method is not a part of Sequelize lifecycle.
  //    * The `models/index` file will call this method automatically.
  //    */
  //   static associate(models) {
  //     // define association here
  //   }
  // }
  // review.init({
  //   user_id: DataTypes.INTEGER,
  //   product_id: DataTypes.INTEGER,
  //   comment: DataTypes.STRING,
  //   rating: DataTypes.INTEGER
  // }, {
  //   sequelize,
  //   modelName: 'review',
  // });
  // return review;
