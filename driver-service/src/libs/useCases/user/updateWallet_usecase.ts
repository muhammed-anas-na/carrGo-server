import { createToken } from "../../../util/jwt/jwt";
import env from 'dotenv';
env.config()


export const updateWallet_usecase = (dependencies:any)=>{
    const {repository:{driverRepository}} = dependencies;
    if(!driverRepository) throw new Error("No userRepository found");
    const execute = async(data: object)=>{
        const result = await driverRepository.updateWalletByDriverId(data);
        return result;
        
    }
    return {
        execute
    }
}