import env from 'dotenv';
env.config()
import twilio from 'twilio';

const accountSid = 'AC35aee1bc8e26ed6a215cd37e406dc38e';
const authToken = 'b3bc3e59ca393bf66b762811e58bedf7';
const client = twilio(accountSid, authToken);


interface data{
    email:string
}

export const sendSms_usecase = (dependencies:any)=>{
    const {repository:{userRepository}} = dependencies;
    if(!userRepository) throw new Error("No userRepository found");
    const execute = async(data: data)=>{
        let userExist = await userRepository.findUserByEmail(data.email);
        if(userExist){
            throw new Error("User already exist")
        }
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