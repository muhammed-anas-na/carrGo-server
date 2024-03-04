import { NextFunction, Request , Response } from "express"

export default (dependencies:any)=>{
    const getDriverDetails_controller =  async(req: Request,res: Response,next: NextFunction)=>{
        try{
            const {useCases:{getDriverDetails_usecase}} = dependencies
            const {Id} = req.body
            console.log("Driver Id ==>" , Id);
            const response = await getDriverDetails_usecase(dependencies).execute(Id);
            console.log("Response Get Driver By Id ==>" , response);
            res.status(200).json(response);
        }catch(err){
            console.log("Something went wrong." , err)
            next(err)
        }
    }
    return getDriverDetails_controller
}