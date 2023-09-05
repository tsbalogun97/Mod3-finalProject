const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {// this function is what generates the token for the user's signup/login functions. *the agument _id is passed because it will be part of the payload of the token
  return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'} )//created a secret passcode for user with expires in 3 days

}



// login user
const loginUser = async (req, res) => {
  res.json({msg: 'login user'})
}


//signup user
const signupUser = async (req, res) => {
  
  const {email, password} = req.body//grabbing email and password from req.body

    try {
      const user = await User.signup(email, password)

      // create a token
      const token = createToken(user._id)
      
      res.status(200).json({email, token})//if everything goes well this will spin up
    
    } catch(error) {
      res.status(400).json({error: error.message})//if not, this error message will spin up
    }
  
  // res.json({msg: 'signup user'})
}

module.exports = {signupUser, loginUser}

