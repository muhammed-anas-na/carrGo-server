import { createToken } from "../../../util/jwt/jwt";
import env from 'dotenv';
env.config()
export const getAllUser_usecase = (dependencies:any)=>{
    const {repository:{userRepository}} = dependencies;
    if(!userRepository) throw new Error("No userRepository found");
    const execute = async(Id: string)=>{
        const result = await userRepository.getAllUsers();
        return result;
    }

    return {
        execute
    }
} 