import { createToken } from "../../../util/jwt/jwt";
import env from 'dotenv';
env.config()

interface data{
    otp: string,
}

export const adminAcceptedDriverRequest_usecase = (dependencies:any)=>{
    const {repository:{driverRepository}} = dependencies;
    if(!driverRepository) throw new Error("No userRepository found");
    const execute = async(data: data)=>{
        const result = await driverRepository.updateAcceptDriver(data);
        console.log("Result =>" , result);
    }
    return {
        execute
    }
}