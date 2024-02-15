import { Kafka, Producer, Consumer, EachMessagePayload } from 'kafkajs';

class KafkaService {
    private kafka: Kafka;
    private producer: Producer;
    private consumer: Consumer;

    constructor() {
        this.kafka = new Kafka({
            clientId: 'nodejs-kafka',
            brokers: ['localhost:9092'],
        });

        this.producer = this.kafka.producer();
        this.consumer = this.kafka.consumer({ groupId: 'test-group' });
    }

    async produce(topic: string, message: any) {
        try {
            await this.producer.connect();
            await this.producer.send({
                topic: topic,
                messages: [{ value: JSON.stringify(message) }],
            });
            console.log('Message sent successfully!');
        } catch (error) {
            console.log(error);
        } finally {
            await this.producer.disconnect();
        }
    }

    async consume(topic: string, callback: (value: string) => void) {
        try {
            await this.consumer.connect();
            await this.consumer.subscribe({ topic: topic, fromBeginning: true });
            await this.consumer.run({
                eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
                    const value = message.value?.toString();
                    if (value) {
                        callback(value);
                    }
                },
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export default KafkaService;
