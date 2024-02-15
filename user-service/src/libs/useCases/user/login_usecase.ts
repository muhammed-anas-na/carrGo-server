import { createToken } from "../../../util/jwt/jwt";
import env from 'dotenv';
env.config()
export const loginUser_usecase = (dependencies:any)=>{
    const {repository:{userRepository}} = dependencies;
    if(!userRepository) throw new Error("No userRepository found");
    const execute = async(phone: string , password: string)=>{
        //Getting ddata from the db using email
        //Check password also============
        const userData = await userRepository.checkCreadentials(phone,password);
        const accessToken = createToken(userData,process.env.ACCESS_JWT_SECRET_KEY!)
        console.log("UserData ==>",userData);
        return {
            userData,
            accessToken,
        }
    }

    return {
        execute
    }
}