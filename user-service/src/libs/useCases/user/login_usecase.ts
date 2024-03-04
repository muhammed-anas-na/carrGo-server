import { createToken , createRefreshToken } from "../../../util/jwt/jwt";
import env from 'dotenv';
env.config()
export const loginUser_usecase = (dependencies:any)=>{
    const {repository:{userRepository}} = dependencies;
    if(!userRepository) throw new Error("No userRepository found");
    const execute = async(phone: string , password: string)=>{
        const userData = await userRepository.checkCreadentials(phone,password);
        const accessToken = createToken(userData,process.env.ACCESS_JWT_SECRET_KEY!)
        const refreshToken = createRefreshToken(userData,process.env.ACCESS_JWT_SECRET_KEY!)
        console.log("Refresh TOken => ", refreshToken)
        return {
            userData,
            accessToken,
            refreshToken,
        }
    }

    return {
        execute
    }
}