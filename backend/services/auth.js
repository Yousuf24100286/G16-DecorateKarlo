require('dotenv').config() ;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validateUser = require('../utils/validate').validateUser
const {createToken} = require('../utils/jwtToken');
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
  
        const UserByEmail = await getUserByEmail(email) ;
        const UserByUserName = await getUserByUserName(username) ;
        if(UserByEmail){
          throw new ErrorHandler(400, 'Email already exists');
        }
        if(UserByUserName){
          throw new ErrorHandler(400, 'Username already exists');
        }
  
        const newUser = await addUser({
          username: username,
          password_hash: hash,
          email: email,
          first_name: first_name,
          last_name: last_name,
          telephone: telephone,
          priv: 'Customer'
        }) ;
        logger.info('newUser', newUser);

  
        const token = createToken({
          id: newUser.id,
          username: newUser.username,
          email: newUser.email
        });
        logger.info('token', token);
        return {token: token, user: newUser} ;
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
        const UserByEmail = await getUserByEmail(email) ;
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
        return {token: token, user: UserByEmail} ;
      } else {
        throw new ErrorHandler(400, 'Please enter valid email and password');
      }
    }
    catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }


}


module.exports = new AuthService();