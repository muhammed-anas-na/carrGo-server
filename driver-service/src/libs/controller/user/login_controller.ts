import { NextFunction, Request , Response } from "express"

export default (dependencies:any)=>{
    const login =  async(req: Request,res: Response,next: NextFunction)=>{
        try{
            const {useCases:{loginDriver_usecase}} = dependencies
            const {number,password} = req.body;
            const response = await loginDriver_usecase(dependencies).execute(number,password);
            if(response.message){
                res.json(response)
            }else{
                console.log("RESPONSE ===>" , response)
                const {driverDetails,accessToken,} = response
                res.status(200).json({driverDetails,accessToken})
            }
        }catch(err){
            console.log("Something went wrong." , err)
            next(err)
        }

    }
    return login
}