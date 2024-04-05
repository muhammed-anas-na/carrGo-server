import mongoose from "mongoose"
import {driver} from '../database/models/driverModel'
import bcrypt from 'bcrypt';
interface signupData{
    full_name: string,
    email: string,
    phone: string,
    alt_number: string,
    password: string
}

interface googleUserData{
  drive:{
    email:string,
    given_name: string,
    family_name: string,
  }
}

export default{
    checkCreadentials:async(phone: string,password: string)=>{
      const userExist = await driver.findOne({ phone: phone, isBlocked: false });

      if(userExist){
        if(userExist.password && typeof userExist.password === 'string'){
        let status = await bcrypt.compare(password , userExist.password)
        if(status){
          console.log("Credentials are valid")
          return userExist
        }else{
          throw new Error("Invalid password")
        }
        }
      }else{ 
        console.log("No user found")
        throw new Error("Invalid Number")
      }
    },
    findDriverByNumber:async(number: string)=>{
        const userObject = await driver.findOne({phone:number});
        Object.freeze(userObject);
        return userObject;
    },

    insertDriver:async(full_name: string,email: string,phone: string,password: string, vehicle_details: object)=>{
        let newDriver = new driver({
            full_name:full_name,
            email:email,
            phone:phone,
            password:password,
            vehicle_details,
            createdAt: Date.now()
        })
        await newDriver.save()
        return {
          newDriver
        }
    },

    validate_signup:(full_name: string , email: string , phone: string ,password: string)=>{
        if(!full_name){
          throw new Error("User should have a Full name")
        }else{
          const first_name_regex = /^[A-Z][a-zA-Z]{3,}$/
          if(!first_name_regex.test(full_name)){
            throw new Error("Invalid Full name")
          }
        }
        if(!email){
          throw new Error("User should have a email")
        }else{
          const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if(!email_regex.test(email)){
            throw new Error("Invalid email")
          }
        }
        if(!phone){
          throw new Error("User should have phone")
        }else{
          const phone_regex = /^\d{10}$/
          if(!phone_regex.test(phone)){
            throw new Error("Phone number is not valid")
          }
        }
        if(!password){
          throw new Error("User should have password")
        }else{
          const password_regex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/
          if(!password_regex.test(password)){
            throw new Error("Password not valid")
          }
        }
      },

      findDriverById:(id: string)=>{
        return driver.findById(id);
      }, 
      getAllDrivers:()=>{
        return driver.find();
      },
      updateAcceptDriver:(data:{driverId: string})=>{
        const driverId = data.driverId;
        console.log("DRIVER ID ==>" , driverId);
        return driver.findByIdAndUpdate(driverId , {isBlocked:false});
      },
      blockDriverById:(data:{driverId: string , isBlocked:boolean})=>{
        const driverId = data.driverId;
        if(data.isBlocked){
          return driver.findByIdAndUpdate(driverId , {isBlocked:false} , {new:true});
        }else{
          return driver.findByIdAndUpdate(driverId , {isBlocked:true} , {new:true});
        }
      },

      updateWalletByDriverId:(data:{driverId: string , fare:string})=>{
        const fareAmount  = parseInt(data.fare)
        return driver.findByIdAndUpdate(data.driverId , {
          $inc:{wallet:fareAmount }
        } , {new:true})
      }
} 