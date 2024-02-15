import { NextFunction, Request , Response } from "express";


export default (dependencies:any)=>{
    const login =  async(req: Request,res: Response,next: NextFunction)=>{
        try{
            const {useCases:{loginUser_usecase}} = dependencies
            const {number,password} = req.body;
            const response = await loginUser_usecase(dependencies).execute(number,password);
            if(response.message){
                res.json(response)
            }else{
                const {userData,accessToken,} = response
                res.status(200).json({userData,accessToken})
            }
        }catch(err){
            console.log("Something went wrong." , err)
            next(err)
        }

    }
    return login
}