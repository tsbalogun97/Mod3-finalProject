const mongoose = require("mongoose");

const Schema = mongoose.Schema;



const carSchema = new Schema(
  {
    make: { type: String, required: true },
    model: {
      
      type: String,
      required: true,
    },
    year: {
      type: Number,
    },
    image: {
      type: String,
    },
    available: {
      type: Boolean,
    },
    }, {timestamps: true}
  
  );

module.exports = mongoose.model("Car", carSchema);

//this will find all of the cars in the collections folder
// car.find()