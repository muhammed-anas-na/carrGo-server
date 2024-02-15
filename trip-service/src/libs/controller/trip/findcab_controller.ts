import { NextFunction, Request , Response } from "express";


export default (dependencies:any)=>{
    const findcab_controller =  async(req: Request,res: Response,next: NextFunction)=>{ 
        try{
            const {useCases:{findcab_usecase}} = dependencies;
            const response = await findcab_usecase(dependencies).execute(req.body);
            console.log("Response =>" , response);
            res.status(200).json(response.data)
        }catch(err){
            console.log("Error catched at trip controller =>" , err)
            next(err);
        }  
    }
    return findcab_controller 
}