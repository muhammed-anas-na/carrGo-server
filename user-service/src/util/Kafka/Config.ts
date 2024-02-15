import { Kafka, EachMessagePayload } from "kafkajs";

class KafkaConfig {
    private kafka: Kafka;
    private producer: any;
    private consumer: any;

    constructor() {
        this.kafka = new Kafka({
            clientId: 'kafka-id',
            brokers: ['localhost:9093'] // Fix the typo here
        });

        this.producer = this.kafka.producer();
        this.consumer = this.kafka.consumer({ groupId: 'test-group' });
    }

    async produce(topic: string, message: any) {
        try {
            await this.producer.connect();
            await this.producer.send({
                topic: topic,
                messages: [{ value: JSON.stringify(message) }] // Messages should be an array of objects with 'value' property
            });
        } catch (err) {
            console.error(err);
        } finally {
            await this.producer.disconnect();
        }
    }

    async consume(topic: string, callback: (value: string) => void) {
        await this.consumer.connect();
        await this.consumer.subscribe({ topic: topic, fromBeginning: true });

        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
                const value = message.value?.toString();
                if (value) {
                    callback(value);
                }
            }
        });
    }
}

// //Example usage:
// const kafkaConfig = new KafkaConfig();

// // Produce a message
// kafkaConfig.produce('test-topic', { key: 'value' });

// // Consume messages
// kafkaConfig.consume('test-topic', (value: string) => {
//     console.log('Received message:', value);
// });
