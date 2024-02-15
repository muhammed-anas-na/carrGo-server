import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()

export const dbConenct = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL!)
        console.log("Driver service connected to DB");
    }catch(err){
        console.log("Error connection")
    }
}