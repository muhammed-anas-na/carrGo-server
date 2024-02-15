import { createToken } from "../../../util/jwt/jwt";
import env from 'dotenv';

env.config()
export const loginDriver_usecase = (dependencies:any)=>{
    const {repository:{driverRepository}} = dependencies;
    if(!driverRepository) throw new Error("No userRepository found");
    const execute = async(phone: string , password: string)=>{
        const driverDetails = await driverRepository.checkCreadentials(phone,password);
        const accessToken = createToken(driverDetails , process.env.ACCESS_JWT_SECRET_KEY!)

        return {
            driverDetails,
            accessToken
        }
        
    }

    return {
        execute
    }
}