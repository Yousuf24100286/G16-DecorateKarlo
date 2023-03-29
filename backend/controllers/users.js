const logger = require('../utils/logger');
const userService = require('../services/user');

const getUserByID = async (req, res, id, next) => {
  logger.info('Controller: User - Call: getUserByID');
  const user =  await userService.getUserByID(id);
  res.status(200).json(user);
}

const updateEmail = async (req, res, id, next) => {
  logger.info('Controller: User - Call: updateEmail');
  const user = await userService.updateEmail(id, req.body.email);
  res.status(200).json(user);
}

const updateUsername = async (req, res, id, next) => {
  logger.info('Controller: User - Call: updateUsername')
  const user = await user.userService.updateUsername(id, req.body.email)
  res.status(200).json(user) ;
}

const updateFirstName = async (req, res, id, next) => {
  logger.info('Controller: User - Call: updateFirstName')
  const user = await userService.updateFirstName(id, req.body.first_name)
  res.status(200).json(user) ;
}

const updateLastName = async (req, res, id, next) => {
  logger.info('Controller: User - Call: updateLastName')
  const user = await userService.updateLastName(id, req.body.last_name)
  res.status(200).json(user) ;
}

const updateTelephone = async (req, res, id, next) => {
  logger.info('Controller: User - Call: updateTelephone')
  const user = await userService.updateTelephone(id, req.body.telephone)
  res.status(200).json(user) ;
}

const updatePassword = async (req, res, id, next) => {
  logger.info('Controller: User - Call: updatePassword')
  const password_hash = await bcrypt.hash(req.body.password, process.env.HASH_SALT_KEY);
  const user = await userService.updatePassword(id, password_hash)
  res.status(200).json(user) ;
}

module.exports = {
  getUserByID,
  updateEmail,
  updateUsername,
  updateFirstName,
  updateLastName,
  updateTelephone,
  updatePassword
}


