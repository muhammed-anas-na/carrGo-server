import { Request,Response,NextFunction } from "express";

export default(dependencies: any)=>{
    const searchLocationController = async(req: Request,res: Response,next: NextFunction)=>{
        const {useCases:{searchLocation_usecase}} = dependencies;
        try{
            console.log(req.body);
            const response = await searchLocation_usecase(dependencies).execute(req.body);
            res.status(200).json(response);
        }catch(err){
            console.log("Error catch on search Location controller =>",err);
            next(err);
        }
    }

    return searchLocationController;
}