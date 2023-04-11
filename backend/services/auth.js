require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validateUser = require('../utils/validate').validateUser
const {createToken} = require('../utils/jwtToken');
const userService = require('../services/user');
const cartService = require('../services/cart');
const {getUserByEmail, getUserByUserName, addUser } = require('../services/user');
const logger = require('../utils/logger');
const ErrorHandler = require('../middlewares/errorHandler').ErrorHandler;


class AuthService {
  async createUser(user) {
    try {
      logger.info('Service: Auth - Call: createUser')
      const {first_name, last_name, username, email, password, telephone } = user;
      if(!first_name || !last_name || !username || !email || !password || !telephone){
        throw new ErrorHandler(400, 'Please enter all fields');  
      }
      if(validateUser(email,password)){
        const hash = await bcrypt.hash(password, parseInt(process.env.HASH_SALT_KEY) ) ;
        const UserByEmail = await userService.getUserByEmail(email) ;
        const UserByUserName = await userService.getUserByUserName(username) ;
        if(UserByEmail){
          throw new ErrorHandler(400, 'Email already exists');
        }
        if(UserByUserName){
          throw new ErrorHandler(400, 'Username already exists');
        }
  
        const newUser = await userService.addUser({
          username: username,
          password_hash: hash,
          email: email,
          first_name: first_name,
          last_name: last_name,
          telephone: telephone,
          priv: 'Customer'
        }) ;
        logger.info('newUser', newUser);
        const cart = await cartService.createCart(newUser.id) ;
        logger.info('cart', cart);


        const token = createToken({
          id: newUser.id,
          username: newUser.username,
          email: newUser.email
        });
        logger.info('token', token);
        return {token: token, user: newUser, cart: cart} ;
      } else {
        throw new ErrorHandler(400, 'Please enter valid email and password');
      }
    }
    catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async loginUser(user) {
    try {
      logger.info('Service: Auth - Call: loginUser')
      const {email, password} = user;
      if(!email || !password){
        throw new ErrorHandler(400, 'Please enter all fields');  
      }
      if(validateUser(email,password)){
        const UserByEmail = await userService.getUserByEmail(email) ;
        if(!UserByEmail){
          throw new ErrorHandler(400, 'Email does not exist');
        }
        const isMatch = await bcrypt.compare(password, UserByEmail.password_hash);
        if(!isMatch){
          throw new ErrorHandler(400, 'Invalid credentials');
        }
        const token = createToken({
          id: UserByEmail.id,
          username: UserByEmail.username,
          email: UserByEmail.email
        });
        logger.info('token', token);

        const cart = await cartService.getCartByUserID(UserByEmail.id) ;
        
        return {token: token, user: UserByEmail, cart: cart} ;
      } else {
        throw new ErrorHandler(400, 'Please enter valid email and password');
      }
    }
    catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async updateUser(body) {
    try {
      logger.info('Service: Auth - Call: updateUser')
      const {id, first_name, last_name, username, email, telephone } = body;
      if(!id || !first_name || !last_name || !username || !email || !telephone){
        throw new ErrorHandler(400, 'Please enter all fields');  
      }
      const user = await userService.getUserByID(id) ;
      if(!user){
        throw new ErrorHandler(400, 'User does not exist');
      }
      await userService.updateUser(id, { 
        username: username,
        email: email,
        first_name: first_name,
        last_name: last_name,
        telephone: telephone
      }) ;
      // wait for few milliseconds to get the updated user
      await new Promise(resolve => setTimeout(resolve, 1000));


      const updatedUser = await userService.getUserByID(id) ;
      logger.info('updatedUser', updatedUser);
      const token = createToken({
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email
      });
      logger.info('token', token);
      return {token: token, user: updatedUser} ;
    }
    catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async updatePassword(body) {
    try {
      logger.info('Service: Auth - Call: updatePassword')
      const {id, oldPassword, newPassword} = body;
      if(!id || !oldPassword || !newPassword){
        throw new ErrorHandler(400, 'Please enter all fields');  
      }
      const user = await userService.getUserByID(id) ;
      if(!user){
        throw new ErrorHandler(400, 'User does not exist');
      }
      const isMatch = await bcrypt.compare(oldPassword, user.password_hash);
      if(!isMatch){
        throw new ErrorHandler(400, 'Invalid credentials');
      }
      const hash = await bcrypt.hash(newPassword, parseInt(process.env.HASH_SALT_KEY) ) ;
      await userService.updatePassword(id, hash) ;
      // wait for few milliseconds to get the updated user
      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedUser = await userService.getUserByID(id) ;

      const token = createToken({
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email
      });
      return {token: token, user: updatedUser} ;
    }
    catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };
};


module.exports = new AuthService();
