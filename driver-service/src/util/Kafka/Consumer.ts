import KafkaService from "../Kafka/Config";

export const consumerConfig = (dependencies: any) => {
    console.log("Consummerr")
    const {useCases:{adminAcceptedDriverRequest_usecase}} = dependencies;
    const kafka = new KafkaService();
    kafka.consume('DRIVER_ACCEPTED', (data) => {
        adminAcceptedDriverRequest_usecase(dependencies).execute(JSON.parse(data));
    });
};
