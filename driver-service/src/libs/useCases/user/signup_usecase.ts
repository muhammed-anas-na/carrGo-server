import dotenv from 'dotenv';
dotenv.config()
import { createToken } from '../../../util/jwt/jwt';
import KafkaService from '../../../util/Kafka/Config';

export const signup_usecase=(dependencies:any)=>{
    //Creating a new object for kafka
    const kafka = new KafkaService();

    const {repository:{driverRepository}} = dependencies;
    if(!driverRepository) throw new Error("No DriverRepository found");

    
    const execute = async(full_name: string , email: string , phone: string , password: string , vehicle_details: object)=>{
        console.log(phone);
        let userExist = await driverRepository.findDriverByNumber(phone);
        console.log("User exist =>" , userExist);
        if(userExist){
            throw new Error("Driver already exist")
        }else{
            let newDriver = await driverRepository.insertDriver(full_name,email,phone,password,vehicle_details);
            kafka.produce('newDriverCreated' , {...newDriver});
            const accessToken = createToken(newDriver,process.env.ACCESS_JWT_SECRET_KEY!)
            return {
                ...newDriver, 
                accessToken
            }
        }
    }

    return {
        execute
    }
} 