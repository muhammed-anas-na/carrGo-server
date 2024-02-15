import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const adminModel = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    phone: String,
    password: String,
    dob: String,
    createdAt: Date,
    isBlocked: Boolean,
    current_location: String,
    isSuperAdmin:{
      type:Boolean,
      default:false
    }
})

adminModel.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    this.password = await bcrypt.hash(this.password || '', 10) || '';
  });

const admin = mongoose.model('admin' , adminModel);
export {admin}