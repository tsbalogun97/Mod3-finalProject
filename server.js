require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const carRoutes = require('./Routes/cars')

// express app
const app = express()

//middleware
//for any request that comes in, it looks to see if it has some data and if it does, then it passes
//and attaches it to the request object
app.use(express.json())

app.use((req,res, next)=> {
  console.log(req.path, req.method);
  next()
})



// routes handler
app.use('/api/cars', carRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(()=> {
    //listen for request
app.listen(process.env.PORT, ()=>{
  console.log('connected to DB & listening on port', process.env.PORT);
})
  })
  .catch((error)=> {
    console.log(error);
  })




process.env

