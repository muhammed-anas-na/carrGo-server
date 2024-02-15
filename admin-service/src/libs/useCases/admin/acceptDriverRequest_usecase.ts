import env from 'dotenv';
import KafkaService from "../../../util/Kafka/Config";
env.config()
export const acceptDriverRequest_usecase = (dependencies:any)=>{
    const kafka = new KafkaService();
    const {repository:{adminRepository}} = dependencies;
    if(!adminRepository) throw new Error("No Admin Repository found");
    const execute = async(data: object)=>{
        console.log("Inn USecase")
        let update = await adminRepository.updateStatus(data);
        console.log("Updated in admin db" , update)
        kafka.produce('DRIVER_ACCEPTED' , {...data})
    }
    return {
        execute
    }
}