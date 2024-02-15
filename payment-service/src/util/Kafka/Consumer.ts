import KafkaService from "../Kafka/Config";

export const consumerConfig = (dependencies: any) => {
    const {useCases:{newDriverCreated_usecase}} = dependencies;
    const kafka = new KafkaService();
    kafka.consume('newDriverCreated', (data) => {
        console.log("NEW DRIVER CREATED");
        const response = newDriverCreated_usecase(dependencies).execute(JSON.parse(data))
    });
};
