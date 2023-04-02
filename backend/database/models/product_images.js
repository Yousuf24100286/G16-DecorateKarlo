'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product_images.belongsTo(models.product, {
        foreignKey: 'product_id',
        as: 'product'
      });
    }
  }
  product_images.init({
    product_id: DataTypes.INTEGER,
    image_url: DataTypes.STRING,
    main_image: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'product_images',
  });
  return product_images;
};