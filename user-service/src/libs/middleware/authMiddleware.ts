import {Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

    const authMiddlewawre=(req: Request,res: Response,next: NextFunction)=>{
        console.log("AUTH MIDDLEWARE")
        if(!req.headers.authorization){
            console.log("NO HEADER")
            throw new Error("Not Authorized")
        }else{
            try{
                console.log("TRYYY")
                console.log(req.headers.authorization)
                const decode = jwt.verify(req.headers.authorization, process.env.ACCESS_JWT_SECRET_KEY!)
                console.log('Decode =>', decode);
                next();
            }catch(err){
                console.log(err);
                throw new Error("Token verification Error");
            }
        }
        
    }

export default authMiddlewawre;