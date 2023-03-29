const Sequelize = require('sequelize');
const logger = require('../utils/logger');
const sequelize = new Sequelize(process.env.DEV_PGDATABASE_URL);
const Products = require('../database/models/products')(sequelize, Sequelize.DataTypes)
const Cart = require('../database/models/cart')(sequelize, Sequelize.DataTypes)
const CartItems = require('../database/models/cart_items')(sequelize, Sequelize.DataTypes)


class CartService {
  async getCartByID(id) {
    try {
      logger.info('Service: Cart - Call: getCartByID')
      const cart = await Cart.findOne({
        where: {
          id: id
        }
      })
      return cart;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async addProductToCart(cart_id, product_id, quantity) {
    try {
      logger.info('Service: Cart - Call: addProductToCart')
      const cart = await Cart.findOne({
        where: {
          id: cart_id
        }
      })
      const product = await Products.findOne({
        where: {
          id: product_id
        }
      })
      const cartItem = await CartItems.create({
        cart_id: cart.id,
        product_id: product.id,
        quantity: quantity
      })
      return cartItem;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }
  async removeProductFromCart(cart_id, product_id) {
    try {
      logger.info('Service: Cart - Call: removeProductFromCart')
      const cart = await Cart.findOne({
        where: {
          id: cart_id
        }
      })
      const product = await Products.findOne({
        where: {
          id: product_id
        }
      })
      const cartItem = await CartItems.destroy({
        where: {
          cart_id: cart.id,
          product_id: product.id
        }
      })
      return cartItem;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }
  async updateProductQuantity(cart_id, product_id, quantity) {
    try {
      logger.info('Service: Cart - Call: updateProductQuantity')
      const cart = await Cart.findOne({
        where: {
          id: cart_id
        }
      })
      const product = await Products.findOne({
        where: {
          id: product_id
        }
      })
      const cartItem = await CartItems.update({
        quantity: quantity
      }, {
        where: {
          cart_id: cart.id,
          product_id: product.id
        }
      })
      return cartItem;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }
  

  async getCartItems(cart_id) {
    try {
      logger.info('Service: Cart - Call: getCartItems')
      const cartItems = await CartItems.findAll({
        where: {
          cart_id: cart_id
        }
      })
      return cartItems;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }
  async getCartTotal(cart_id) {
    try {
      logger.info('Service: Cart - Call: getCartTotal')
      const cartItems = await CartItems.findAll({
        where: {
          cart_id: cart_id
        }
      })
      let total = 0;
      for (let i = 0; i < cartItems.length; i++) {
        total += cartItems[i].quantity * cartItems[i].product.price;
      }
      return total;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async emptyCart(cart_id) {
    try {
      logger.info('Service: Cart - Call: emptyCart')
      const cartItems = await CartItems.destroy({
        where: {
          cart_id: cart_id
        }
      })
      return cartItems;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async createCartOfUser(user_id) {
    try {
      logger.info('Service: Cart - Call: createCartOfUser')
      const cart = await Cart.create({
        user_id: user_id
      })
      return cart;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }
}


module.exports = new CartService();