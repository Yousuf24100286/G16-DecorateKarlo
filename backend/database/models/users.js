'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    username: DataTypes.STRING,
    password_hash: DataTypes.TEXT,
    email: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    telephone: DataTypes.STRING,
    priv: DataTypes.STRING
  }, {});
  users.associate = function(models) {
    // associations can be defined here
    users.hasMany(models.cards, {
      foreignKey: 'user_id',
      as: 'cards'
    });
    users.hasMany(models.order_details, {
      foreignKey: 'user_id',
      as: 'order_details'
    });
    users.hasMany(models.reviews, {
      foreignKey: 'user_id',
      as: 'reviews'
    });
  };


  return users;
};































  // class users extends Model {
  //   /**
  //    * Helper method for defining associations.
  //    * This method is not a part of Sequelize lifecycle.
  //    * The `models/index` file will call this method automatically.
  //    */
  //   static associate(models) {
  //     // define association here
  //   }
  // }
  // users.init({
  //   username: DataTypes.STRING,
  //   password_hash: DataTypes.STRING,
  //   email: DataTypes.STRING,
  //   first_name: DataTypes.STRING,
  //   last_name: DataTypes.STRING,
  //   telephone: DataTypes.STRING,
  //   priv: DataTypes.STRING
  // }, {
  //   sequelize,
  //   modelName: 'users',
  // });
  // return users;