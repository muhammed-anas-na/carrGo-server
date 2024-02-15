import env from 'dotenv';
env.config()
import twilio from 'twilio';

const accountSid = 'AC35aee1bc8e26ed6a215cd37e406dc38e';
const authToken = 'b3bc3e59ca393bf66b762811e58bedf7';
const client = twilio(accountSid, authToken);


interface data{
    full_name: string,
    email: string,
    password: string,
    phone:string
}

export const sendSms_usecase = (dependencies:any)=>{
    const {repository:{driverRepository}} = dependencies;
    if(!driverRepository) throw new Error("No userRepository found");
    const execute = async(data: data)=>{
        console.log(data)
        let userExist = await driverRepository.findDriverByNumber(data.phone);
        if(userExist){
            throw new Error("User already exist")
        }
        await driverRepository.validate_signup(data.full_name,data.email,data.phone,data.password)
        const otp = Math.floor(1000 + Math.random() * 9000).toString()
        const response = await client.messages.create({
            body: 'Verify your account using this otp:'+ otp,
            from: '+16183684964',
            to: '+918089568695'
        })
        return {response , otp}
    }

    return {
        execute
    }
}