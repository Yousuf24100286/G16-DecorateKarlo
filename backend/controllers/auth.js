const logger = require('../utils/logger');
authService = require('../services/auth');

const createUser = async (req, res) => {
  logger.info('createUser', req.body);
  const {token , user, cart} = await authService.createUser(req.body);
  res.status(201).json({token, user, cart});
}

const loginUser = async (req, res) => {
  logger.info('Controller: Auth - Call: loginUser');
  const {token , user, cart} = await authService.loginUser(req.body);
  res.status(200).json({token, user, cart});
}

const updateUser = async (req, res) => {
  logger.info('Controller: Auth - Call: updateUser');
  const {token , user} = await authService.updateUser(req.body);
  res.status(200).json({token, user});
}

const updatePassword = async (req, res) => {
  logger.info('Controller: Auth - Call: updatePassword');
  const {token , user} = await authService.updatePassword(req.body);
  res.status(200).json({token, user});
}

module.exports = {
  createUser,
  loginUser,
  updateUser,
  updatePassword
};
