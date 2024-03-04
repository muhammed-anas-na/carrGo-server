import jwt from 'jsonwebtoken';
import env from 'dotenv';
import dotenv from 'dotenv'
import { createToken } from '../../../util/jwt/jwt';
dotenv.config();
env.config()
import { JwtPayload } from 'jsonwebtoken';

export const refreshToken_usecase = (dependencies:any)=>{
    const {repository:{userRepository}} = dependencies;
    if(!userRepository) throw new Error("No userRepository found");
    const execute = async(refreshToken: string)=>{
        console.log("This is refresh TOken ==>" ,refreshToken)
        let decodeData =isValidRefreshToken(refreshToken) 
        if (decodeData) {
            console.log("Inside iff")
            console.log("Decoded data ==>" , decodeData);
            const newAccessToken = createToken(decodeData , process.env.ACCESS_JWT_SECRET_KEY!); // Extract userId from refresh token
            console.log("New accessToken ==> " , newAccessToken);
            return({ accessToken: newAccessToken });
          } else {
            return false
          }
    }

    return {
        execute
    }
}

function isValidRefreshToken(refreshToken: string){
    try{
        console.log("isValidRefresh FUnction")
        const decoded: JwtPayload  = jwt.verify(refreshToken, process.env.ACCESS_JWT_SECRET_KEY!) as JwtPayload;
        console.log("Decoded data from refresh token ==>" , decoded.user);
        return  decoded;
    }catch(err){
        console.log(err)
        return false;
    }
}