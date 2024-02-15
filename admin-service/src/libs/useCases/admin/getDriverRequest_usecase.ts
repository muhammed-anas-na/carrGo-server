import { createToken } from "../../../util/jwt/jwt";
import env from 'dotenv';

env.config()
export const getDriverRequest_usecase = (dependencies:any)=>{
    const {repository:{adminRepository}} = dependencies;
    if(!adminRepository) throw new Error("No Admin Repository found");
    const execute = async()=>{
        const result = await adminRepository.getDriverRequest();
        return result;
    }
    return {
        execute
    }
}