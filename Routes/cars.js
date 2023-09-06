const express = require('express')
// const Car = require('../models/Cars')

const {
  createCar,
  getCars,
  getCar,
  deleteCar,
  updateCar
} = require ('../controllers/carController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//require auth for all car routes
router.use(requireAuth)//firing this middleware function before creating the CRUD protects them. users have to authenticate before executing each action.

// GET all cars
router.get('/', getCars)

// GET a single car
router.get('/:id', getCar)

// POST a new car
router.post('/', createCar)
// async (req, res)=> {
  // passes all of the request body to the request object
  // const {make, model, year, image, available} = req.body
  // try{
  //   const car = await Car.create({make, model, year, image, available})
  //   //creates a new document with those 5 properties
  //   res.status(200).json(car)
  // }catch(error) {
  //   res.status(400).json({error: error.message})
  // }
  
  // // res.json({msg: 'POST a new car'})
// })

//DELETE a car
router.delete('/:id', deleteCar)

//UPDATE a car
router.patch('/:id', updateCar)

module.exports = router