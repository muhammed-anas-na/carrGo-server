import mongoose from "mongoose"
import {user} from '../database/models/userModel'
import bcrypt from 'bcrypt';
interface signupData{
    full_name: string,
    email: string,
    phone: string,
    alt_number: string,
    password: string
}

interface googleUserData{
    email:string,
    given_name: string,
    family_name: string,
}

export default{
  loginWithGoogle:async(userData: googleUserData)=>{    
    const userExist = await user.findOne({email:userData.email});
    if(userExist){
      return {userExist}
    }else{
      let newUser = new user({
        first_name: userData.given_name,
        last_name: userData.family_name,
        email: userData.email,
      })
      await newUser.save();
      return {newUser};
    }
  },
    checkCreadentials:async(phone: string,password: string)=>{
      console.log(phone)
      const userExist = await user.findOne({phone:phone})
      
      if(userExist){
        console.log("User exist")
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
        throw new Error("No user found")
      }
    },
    findUserByEmail:async(email: string)=>{
        const userObject = await user.findOne({email:email});
        Object.freeze(userObject);
        return userObject;
    },

    findUserById:async(Id: string)=>{
      let userData = await user.findById(Id);
      return userData;
    },

    insertUser:async(full_name: string,email: string,phone: string,password: string)=>{
        let newUser = new user({
            full_name: full_name,
            email:email,
            phone:phone,
            password:password,
            registration_date: Date.now()
        })
        await newUser.save()
        return {
            newUser
        }
    },

    validate_signup:(data: signupData)=>{
        if(!data.full_name){
          throw new Error("User should have a full name")
        }else{
          const first_name_regex = /^[A-Z][a-zA-Z]{3,}$/
          if(!first_name_regex.test(data.full_name)){
            throw new Error("Invalid Full name")
          }
        }
        if(!data.email){
          throw new Error("User should have a email")
        }else{
          const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if(!email_regex.test(data.email)){
            throw new Error("Invalid email")
          }
        }
        if(!data.phone){
          throw new Error("User should have phone")
        }else{
          const phone_regex = /^\d{10}$/
          if(!phone_regex.test(data.phone)){
            throw new Error("Phone number is not valid")
          }
        }
        if(!data.password){
          throw new Error("User should have password")
        }else{
          const password_regex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/
          if(!password_regex.test(data.password)){
            throw new Error("Password not valid")
          }
        }
      },
      getAllUsers:()=>{
        return user.find();
      },
}