import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const driverModel = new mongoose.Schema({
    full_name: String,
    email: String,
    phone: String,
    password: String,
    dob: String,
    vehicle_details: Object,
    rating: String,
    createdAt: Date,
    license_number: String,
    isBlocked: {
      type: Boolean,
      default:true,
    },
    isPremium: Boolean,
    current_location: String,
})

driverModel.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    this.password = await bcrypt.hash(this.password || '', 10) || '';
  });

const driver = mongoose.model('driver' , driverModel);
export {driver}