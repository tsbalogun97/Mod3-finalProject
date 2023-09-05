const User = require('../models/userModel')

// login user
const loginUser = async (req, res) => {
  res.json({msg: 'login user'})
}



//signup user
const signupUser = async (req, res) => {
  
  const {email, password} = req.body//grabbing email and password from req.body

    try {
      const user = await User.signup(email, password)
      
      res.status(200).json({email, user})//if everything goes well this will spin up
    
    } catch(error) {
      res.status(400).json({error: error.message})//if not, this error message will spin up
    }
  
  // res.json({msg: 'signup user'})
}

module.exports = {signupUser, loginUser}
