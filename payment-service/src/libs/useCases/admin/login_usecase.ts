import { createToken } from "../../../util/jwt/jwt";
import env from 'dotenv';

env.config()
export const loginAdmin_usecase = (dependencies:any)=>{
    const {repository:{adminRepository}} = dependencies;
    if(!adminRepository) throw new Error("No Admin Repository found");
    const execute = async(email: string , password: string)=>{
        const adminDetails = await adminRepository.checkCreadentials(email,password);
        const accessToken = createToken(adminDetails , process.env.ACCESS_JWT_SECRET_KEY!)
        return {
            adminDetails,
            accessToken
        }
        
    }

    return {
        execute
    }
}