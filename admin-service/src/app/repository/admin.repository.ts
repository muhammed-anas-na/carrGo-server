import {admin} from '../database/models/adminModel'
import bcrypt from 'bcrypt';
import { driver } from '../database/models/driverModel';

interface signupData{
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    alt_number: string,
    password: string
}

interface googleUserData{
  admin:{
    email:string,
    given_name: string,
    family_name: string,
  }
}

export default{
    checkCreadentials:async(email: string,password: string)=>{
      const userExist = await admin.findOne({email:email})
      
      if(userExist){
        console.log("Admin exist")
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
        throw new Error("Invalid Email")
      }
    },
    findAdminByEmail:async(email: string)=>{
        const userObject = await admin.findOne({email:email});
        Object.freeze(userObject);
        return userObject;
    },
    insertDriver:async(_id: string,full_name: string,email: string,phone: string,password: string, vehicle_details: object)=>{
      let newDriver = new driver({
          _id:_id,
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

    getDriverRequest:()=>{
      return driver.find({isBlocked:true})
    },

    updateStatus:(data:{driverId:string})=>{
      const driverId = data.driverId
      return driver.findByIdAndUpdate(driverId , {isBlocked:false})
    }
}