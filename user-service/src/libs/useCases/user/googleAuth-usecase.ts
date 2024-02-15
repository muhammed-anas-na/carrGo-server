import { createToken } from "../../../util/jwt/jwt";
import env from 'dotenv';
env.config()
export const googleAuth_usecase = (dependencies:any)=>{
    const {repository:{userRepository}} = dependencies;
    if(!userRepository) throw new Error("No userRepository found");
    const execute = async(userData : object)=>{
        let newUser = await userRepository.loginWithGoogle(userData)
        const accessToken = createToken(userData,process.env.ACCESS_JWT_SECRET_KEY!)
        return {
            ...newUser,
            accessToken
        }
    }

    return {
        execute
    }
}