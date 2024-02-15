import env from 'dotenv';
env.config()
import nodemailer from 'nodemailer';

interface data{
    email:string
}
export const sendOtp_usecase = (dependencies:any)=>{
    const {repository:{driverRepository}} = dependencies;
    if(!driverRepository) throw new Error("No userRepository found");
    const execute = async(data: data)=>{
        let userExist = await driverRepository.findDriverByEmail(data.email);
        if(userExist){
            throw new Error("User already exist")
        }else{
            console.log("Send email inside")
                const otp = Math.floor(1000 + Math.random() * 9000).toString()
                const transport = nodemailer.createTransport({
                    service:'gmail',
                    auth:{
                        user:"anasna6005@gmail.com",
                        pass:"lypebkgrvqrzzxwh",
                    }
                })
                var mailObj = {
                    from:'anasna6005@gmail.com',
                    to:data.email,
                    subject:'OTP LOGIN',
                    text:`Use this otp for logging in ${otp} `
                }
                return transport.sendMail(mailObj)
                .then(result => {
                    return { otp: otp, emailResult: result };
                })
                .catch(error => {
                    console.error("Error sending email:", error);
                    throw error;
                });
        }
                
    }
    
    return {
        execute
    }
}