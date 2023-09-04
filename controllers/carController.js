const Car = require('../models/Cars')
const mongoose = require('mongoose')



//GET all cars
const getCars = async (req, res) => {
  const cars = await Car.find({}).sort({createdAt: -1})//leaving this blank  and sorting them is a way to get all of the objects in a descending order
  res.status(200).json(cars)
}


//GET a single car
const getCar = async (req, res)=> {
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
  const {make, model, year, image, available} = req.body
  
  //add document to DB
  try{
    const car = await Car.create({make, model, year, image, available})
    //creates a new document with those 5 properties
    res.status(200).json(car)
  }catch(error) {
    res.status(400).json({error: error.message})
  }
}
  


//DELETE  a car
const deletecar = async (req, res) => {
  // first thing to do is grab the id from the route params
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) { //this document will try to see if the id i have is valid
    return res.status(404).json({error: 'No Such Vehicle Here'})
  }

}

//UPDATE a car



module.exports = {
  getCars,
  getCar,
  createCar,

}
