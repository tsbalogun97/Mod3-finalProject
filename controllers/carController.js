const Car = require('../models/Cars')
const mongoose = require('mongoose')



//GET all cars
const getCars = async (req, res) => {
  const cars = await Car.find({}).sort({createdAt: -1})//leaving this blank  and sorting them is a way to get all of the objects in a descending order
  res.status(200).json(cars)
}


//GET a single car
const getCar = async (req, res) => {
  const { id } = req.params
  //getting the id property from the route parameters to try to find a single document

  if (!mongoose.Types.ObjectId.isValid(id)) { //this document will try to see if the id i have is valid
    return res.status(404).json({error: 'No Such Vehicle Here'})
  }

  const car = await Car.findById(id)

  if(!car) { // if  the car doesn't exist, i want to get an error
    return res.status(404).json({error: 'No Such Vehicle Here'})
  }
  res.status(200).json(car)//means all good, the car is available
}
  
  


//CREATE a new car
const createCar = async (req, res) => {
  //grabbing these properties from the request body
  const {make, model, year, image, mileage} = req.body

  let emptyFields = []// the idea here is to detect which fields are empty if when they send the Post request and that info can be send back to the client
  if(!make) {
    emptyFields.push('make')
  }

  if(!model) {
    emptyFields.push('model')
  }
  
  if(!year) {
    emptyFields.push('year')
  }
  
  if(!image) {
    emptyFields.push('image')
  }
  
  if(!mileage) {
    emptyFields.push('mileage')
  }

  if(emptyFields.lenght > 0) {
    return res.status(400).json({ error: 'Please fillin all of the fields', emptyFields})//this will be the message that will populate on the frontend underneath the form and 
  }
  
  //add document to DB
  try{
    const car = await Car.create({make, model, year, image, mileage})
    //creates a new document with those 5 properties
    res.status(200).json(car)
  }catch(error) {
    res.status(400).json({error: error.message})
  }
}
  


//DELETE  a car
const deleteCar = async (req, res) => {
  // first thing to do is grab the id from the route params
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) { //this document will try to see if the id i have is valid
    return res.status(404).json({error: 'No Such Vehicle Here'})
  }
  const car = await Car.findOneAndDelete({_id: id})//in mongoDB, the id is written like this _id property name

  // look if a car is found, if one cant be found to be deleted, then this will be no
  if(!car) { // if  the car doesn't exist, i want to get an error
    return res.status(400).json({error: 'No Such Vehicle Here'})
  }

  res.status(200).json(car)//everything is ok, go ahead and delete
}


//UPDATE a car
const updateCar = async (req, res) => {
  
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) { 
    return res.status(404).json({error: 'No Such Vehicle Here'})
  }

  const car = await Car.findOneAndUpdate({_id: id}, {
    ...req.body
  })
  
  if(!car) { 
    return res.status(400).json({error: 'No Such Vehicle Here'})
  }

  res.status(200).json(car)
  
}






module.exports = {
  getCars,
  getCar,
  createCar,
  deleteCar,
  updateCar

}
