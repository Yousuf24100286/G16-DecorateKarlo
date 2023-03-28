authService = require('../services/auth');

const createUser = async (req, res) => {
  const {token , user} = await authService.createUser(req.body);
  res.status(201).json({token, user});
}


const loginUser = async (req, res) => {

}

module.exports = {
  createUser,
  loginUser
}