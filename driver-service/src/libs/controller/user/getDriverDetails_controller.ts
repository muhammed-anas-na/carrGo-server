import { NextFunction, Request , Response } from "express"

export default (dependencies:any)=>{
    const getDriverDetails_controller =  async(req: Request,res: Response,next: NextFunction)=>{
        try{
            const {useCases:{getDriverDetails_usecase}} = dependencies
            console.log("BOdy==>" , req.body)
            const {Id} = req.body
            const response = await getDriverDetails_usecase(dependencies).execute(Id);
            res.status(200).json(response);
        }catch(err){
            console.log("Something went wrong." , err)
            next(err)
        }
        
    }
    return getDriverDetails_controller
}