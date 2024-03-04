import env from 'dotenv';
env.config()
import KafkaService from "../../../util/Kafka/Config";
import nodemailer from 'nodemailer';

export const acceptDriverRequest_usecase = (dependencies: any) => {
    const kafka = new KafkaService();
    const { repository: { adminRepository } } = dependencies;
    if (!adminRepository) throw new Error("No Admin Repository found");
    const execute = async (data: object) => {
        console.log("Inn USecase")
        let update = await adminRepository.updateStatus(data);
        console.log("Updated in admin db", update)
        kafka.produce('DRIVER_ACCEPTED', { ...data })
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "anasna6005@gmail.com",
                pass: "lypebkgrvqrzzxwh",
            }
        })
        var mailObj = {
            from: 'anasna6005@gmail.com',
            to: update.email,
            subject: 'CarrGo Driver Registration Approved',
            html: `
                <p>Dear ${update.full_name},</p>
                <p>We are excited to inform you that your registration to become a driver with CarrGo has been approved!</p>
                <p>You are now part of our team, and we welcome you aboard. As a CarrGo driver, you will play a crucial role in providing excellent service to our customers.</p>
                <p>Please make sure to familiarize yourself with our policies and procedures to ensure a smooth and successful experience.</p>
                <p>If you have any questions or need assistance, feel free to contact our support team at support@carrgo.com.</p>
                <p>Thank you for choosing CarrGo!</p>
                <br>
                <p>Best regards,</p>
                <p>The CarrGo Team</p>
            `
        };
        
        return transport.sendMail(mailObj)
            .then(result => {
                return {emailResult: result };
            })
            .catch(error => {
                console.error("Error sending email:", error);
                throw error;
            });
    }
    return {
        execute
    }
}