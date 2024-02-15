import { NextFunction, Request , Response } from "express";


export default (dependencies:any)=>{
    const getCoordinates_controller =  async(req: Request,res: Response,next: NextFunction)=>{ 
        try{
            const {useCases:{getCoordinates_usecase}} = dependencies;
            const response = await getCoordinates_usecase(dependencies).execute(req.body);
            console.log("Response =>" , response);
            res.status(200).json(response)
        }catch(err){
            console.log("Error catched at trip controller =>" , err)
            next(err);
        }  
    }
    return getCoordinates_controller;
}