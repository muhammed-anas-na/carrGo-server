import { Request , Response , NextFunction } from "express"

export default (dependencies:any)=>{
    const googleAuth_controller =  async(req: Request,res: Response ,next: NextFunction)=>{
        try{
            const {useCases:{googleAuth_usecase}} = dependencies;
            const data = await googleAuth_usecase(dependencies).execute(req.body);
            console.log("Response data ==>" , data);
            res.status(200).json({data}) 
        }catch(err){
            console.log(err);
            next(err);
        }
    }
    return googleAuth_controller;
}