const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String, 
    required: true,
    unique: true, 
  },
  password: {
    type: String, 
    required: true,
    
  }
})

//static signup method
userSchema.statics.signup = async function(email, password) {

  //validation
  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  if (!validator.isEmail(email)) {// this checks if what was being typed inside the email field is a valid email address
    throw Error('Email is not valid')
  }
  
  // if (!validator.isStrongPassword(password)) {this checks if the password is strong or not
  //   throw Error('Password is not Strong Enough')
  // }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10)//this is how you generate Salt to your password which adds extra layer of protection. 

  const hash = await bcrypt.hash(password, salt) //*bcrypt is a hashing function that hash your password in a secured way in case of any breach in your DB

  const user = await this.create({ email, password: hash })// this is a way to create a record for users in the DB

  return user 

}

//static login method 
userSchema.statics.login = async function(email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })

  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user

}

module.exports = mongoose.model('User', userSchema)