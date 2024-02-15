import {Request, Response, NextFunction } from "express";
export default (dependencies:any)=>{
    const finishTrip_controller = async(req: Request,res: Response,next: NextFunction)=>{ 
        try{
            const {useCases:{finishTrip_usecase}} = dependencies;
            const response = await finishTrip_usecase(dependencies).execute(req.body);
            res.status(200).json(response)
        }catch(err){
            console.log("Error catched at trip controller =>" , err)
            next(err);
        }  
    }
    return finishTrip_controller;
}