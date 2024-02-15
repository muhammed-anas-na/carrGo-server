import dotenv from 'dotenv';
import { createToken } from '../../../util/jwt/jwt';
dotenv.config()

export const signup_usecase=(dependencies:any)=>{
    const {repository:{userRepository}} = dependencies;
    if(!userRepository) throw new Error("No userRepository found");
    const execute = async(full_name: string, email: string , phone: string , password: string)=>{
        let userExist = await userRepository.findUserByEmail(email);
        if(userExist){
            throw new Error("User already exist")
        }else{
            await userRepository.validate_signup({full_name,email,phone,password})
            let newUser = await userRepository.insertUser(full_name,email,phone,password)
            const accessToken = createToken(newUser,process.env.ACCESS_JWT_SECRET_KEY!)
            return {
                ...newUser, 
                accessToken
            }
        }
    }

    return {
        execute
    }
} 