const User = require('../database/models/users');
const hashPassword = require('../utils/hashpassword') ;


exports.createUser = async (req, res, next) => {
  try {
    const {first_name, last_name, username, email, password} = req.body;
    // check whether user exists by username
    const user = User.findOne({where: {username}}) || User.findOne({where: {email}});
    if(user){
      res.status(400).json({msg: 'User already exists'});
    }
    const hash = await hashPassword(password) ;
    const newUser = new User({
      first_name,
      last_name,
      username,
      email,
      hash
    });
    res.status(201).json({message:'User Created successfully'}) ;      
  } catch (error) {
    next(error) ;
  }
}

exports.getUserByID = async (req, res, id, next) => {
  try {
    const user = User.findOne({where: {id}}) ;
    if(user){
      res.status(200).json({user}) ;
    }else{
      res.status(404).json({message: 'User not found'}) ;
    }  
  } catch (error) {
    next(error) ;
  }
}

