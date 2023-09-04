const express = require('express')
const Car = require('../models/carmodel')

const router = express.Router()

// GET all cars
router.get('/', (req, res)=>{
  res.json({msg: 'GET all Cars'})
})

// GET a single car
router.get('/:id', (req, res)=> {
  res.json({msg: 'GET a single car'})
})

// POST a new car
router.post('/', async (req, res)=> {
  // passes all of the request body to the request object
  const {make, model, year, image, available} = req.body
  try{
    const Car = await Car.create({make, model, year, image, available})
    res.status(200).json(car)
  }catch(error) {

  }
  
  res.json({msg: 'POST a new car'})
})

//DELETE a car
router.delete('/:id', (req, res)=> {
  res.json({msg: 'DELETE a car'})
})

//UPDATE a car
router.patch('/:id', (req, res)=> {
  res.json({msg: 'UPDATE a car'})
})

module.exports = router