const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  _id: String,
  socketId: String,
  category: String,
  isLive:{
    type: Boolean,
    enum:[true , false],
  },
  location: {
    type: {
      type: String, // Specify the type as "Point"
      enum: ['Point'], // Specify the allowed values for the type
      default: 'Point' // Set the default value to "Point"
    },
    coordinates: {
      type: [Number] // Specify that coordinates should be an array of numbers
    }
  }
});

const driver = mongoose.model('Driver', driverSchema);
export {driver}
