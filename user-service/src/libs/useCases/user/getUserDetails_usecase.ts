import { createToken } from "../../../util/jwt/jwt";
import env from 'dotenv';
env.config()
export const getUserDetails_usecase = (dependencies:any)=>{
    const {repository:{userRepository}} = dependencies;
    if(!userRepository) throw new Error("No userRepository found");
    const execute = async(Id: string)=>{
        const result = await userRepository.findUserById(Id);
        return result;
    }

    return {
        execute
    }
} 