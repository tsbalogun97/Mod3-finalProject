const express = require('express')

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
router.post('/', (req, res)=> {
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