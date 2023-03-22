'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const cart_session = sequelize.define('cart_session', {
    user_id: DataTypes.INTEGER,
    cart_session_total: DataTypes.DECIMAL
  }, {});
  cart_session.associate = function(models) {
    // associations can be defined here
    cart_session.belongsTo(models.users, {
      foreignKey: 'user_id',
      as: 'user'
    });
    cart_session.hasMany(models.cart_items, {
      foreignKey: 'cart_session_id',
      as: 'cart_items'
    });
  };
  return cart_session;
};













  
  
  // class cart_session extends Model {
  //   /**
  //    * Helper method for defining associations.
  //    * This method is not a part of Sequelize lifecycle.
  //    * The `models/index` file will call this method automatically.
  //    */
  //   static associate(models) {
  //     // define association here
  //   }
  // }
  // cart_session.init({
  //   user_id: DataTypes.INTEGER,
  //   cart_session_total: DataTypes.DECIMAL
  // }, {
  //   sequelize,
  //   modelName: 'cart_session',
  // });
  // return cart_session;