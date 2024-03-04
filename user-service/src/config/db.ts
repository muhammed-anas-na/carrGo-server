import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {user} from '../app/database/models/userModel'

dotenv.config()

export const dbConenct = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL!)
        console.log("User service connected to DB");
    }catch(err){
        console.log("Error connection" , err)
    }
}