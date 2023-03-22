'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const card = sequelize.define('card', {
    user_id: DataTypes.INTEGER,
    card_network: DataTypes.STRING,
    card_holder_name: DataTypes.STRING,
    card_number: DataTypes.STRING,
    card_expiry: DataTypes.STRING,
    card_cvv: DataTypes.STRING
  }, {});
  card.associate = function(models) {
    // associations can be defined here
    card.belongsTo(models.users, {
      foreignKey: 'user_id',
      as: 'user'
    });
  };
  return card;
};



































  
  
  // class card extends Model {
  //   /**
  //    * Helper method for defining associations.
  //    * This method is not a part of Sequelize lifecycle.
  //    * The `models/index` file will call this method automatically.
  //    */
  //   static associate(models) {
  //     // define association here
  //   }
  // }
  // card.init({
  //   user_id: DataTypes.INTEGER,
  //   card_network: DataTypes.STRING,
  //   card_holder_name: DataTypes.STRING,
  //   card_number: DataTypes.STRING,
  //   card_expiry: DataTypes.STRING,
  //   card_cvv: DataTypes.STRING
  // }, {
  //   sequelize,
  //   modelName: 'card',
  // });
  // return card;