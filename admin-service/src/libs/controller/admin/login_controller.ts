import { NextFunction, Request , Response } from "express"

export default (dependencies:any)=>{
    const login =  async(req: Request,res: Response,next: NextFunction)=>{
        try{
            const {useCases:{loginAdmin_usecase}} = dependencies
            const {email,password} = req.body;
            const response = await loginAdmin_usecase(dependencies).execute(email,password);
            if(response.message){
                res.json(response)
            }else{
                const {adminDetails,accessToken,} = response
                res.status(200).json({adminDetails,accessToken})
            }
        }catch(err){
            console.log("Something went wrong." , err)
            next(err)
        }

    }
    return login
}