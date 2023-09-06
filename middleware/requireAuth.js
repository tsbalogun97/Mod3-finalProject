const jwt = require('jsonwebtoken')
const User = require('../models/userModel')


const requireAuth = async (req, res, next) => {

//verify authentication
const { authorization } = req.headers 
//using an authorization headers property from the requesting which will be the token

//checking if authorization token exist
if (!authorization) {
  return res.status(401).json({error: 'Authorization token required!'})
}
  const token = authorization.split(' ')[1]

  try {
    
    const {_id} = jwt.verify(token, process.env.SECRET)//if the request is checkedout, then the id will be available
    //using the id from the payload to try to find a user in the DB. I'm essentially attaching the user property to the request.
    req.user = await User.findOne({ _id }).select('_id')
    next()//fires the next handle function 
  
  }catch (error) {
    console.log(error);
      res.status(401).json({error: 'Request is not authorized!'})
  }

}

module.exports = requireAuth