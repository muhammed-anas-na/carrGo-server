import { driver } from "../../../app/database/models/driverModel";
import { createToken } from "../../../util/jwt/jwt";
import env from 'dotenv';
env.config()

interface drvierData{
    newDriver:{
        full_name: string,
        email: string,
        phone: string,
        password: string,
        vehicleDetails: object,
        createdAt: string,
        isBlocked: boolean,
        _id: string,
    }
}

export const newDriverCreated_usecase = (dependencies:any)=>{
    const {repository:{adminRepository}} = dependencies;
    if(!adminRepository) throw new Error("No Admin Repository found");
    const execute = async(driverData: drvierData)=>{
        console.log("Driver data in use case ==> ",driverData)
        const{full_name , email,phone,password,createdAt,isBlocked,_id,...vehicle_details} = driverData.newDriver;
        const response = await adminRepository.insertDriver(_id,full_name , email , phone, password , vehicle_details)
        console.log("Response from repository =>" , response);
    }
    return {
        execute
    }
}