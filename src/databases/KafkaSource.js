/* eslint-disable import/prefer-default-export */
import { Kafka } from 'kafkajs';

export const kafkaSource = new Kafka({
  clientId: 'node-kafka',
  brokers: ['localhost:9092'],
});

async function init() {
  const admin = kafkaSource.admin();
  try {
    await admin.connect();

    const topics = await admin.listTopics();
    console.log('Kafka connected with topics:', topics);
    if (topics.length !== 0) return;

    await admin.createTopics({
      topics: [{
        topic: 'territories',
        numPartitions: 1,
      }],
    });

    await admin.disconnect();
  } catch (error) {
    console.log(error);
  }
}

init();
