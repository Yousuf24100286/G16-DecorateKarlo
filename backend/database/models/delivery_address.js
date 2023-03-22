'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const delivery_address = sequelize.define('delivery_address', {
    address_line_1: DataTypes.STRING,
    address_line_2: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    postal_code: DataTypes.STRING
  }, {});
  delivery_address.associate = function(models) {
    // associations can be defined here
    delivery_address.belongsTo(models.order_details, {
      foreignKey: 'order_id',
      as: 'order_details'
    });
  };
  return delivery_address;
  
  
  // class delivery_address extends Model {
  //   /**
  //    * Helper method for defining associations.
  //    * This method is not a part of Sequelize lifecycle.
  //    * The `models/index` file will call this method automatically.
  //    */
  //   static associate(models) {
  //     // define association here
  //   }
  // }
  // delivery_address.init({
  //   user_id: DataTypes.INTEGER,
  //   address_line_1: DataTypes.STRING,
  //   address_line_2: DataTypes.STRING,
  //   city: DataTypes.STRING,
  //   country: DataTypes.STRING,
  //   postal_code: DataTypes.STRING
  // }, {
  //   sequelize,
  //   modelName: 'delivery_address',
  // });
  // return delivery_address;
};