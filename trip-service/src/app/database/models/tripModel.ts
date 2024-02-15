const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    customerId: {
        type: String,
        required:true
    },
    driverId: String,
    pickup_location: String,
    dropoff_location: String,
    booking_time : String,
    pickup_time: String,
    dropoff_time: String,
    duration: String,
    fare: String,
    status: String,
    otp: Number,
    payment_method: String,    
    ETA: String,
    review: String,
    createdAt:{
        type: String,
        default: new Date()
    }
});

const trip = mongoose.model('Trip', tripSchema);
export {trip}
