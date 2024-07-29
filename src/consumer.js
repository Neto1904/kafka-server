/* eslint-disable import/extensions */
import { kafkaSource } from './databases/KafkaSource.js';
import { PostgresDataSource } from './databases/PostgresDataSource.js';

async function init() {
  const consumer = kafkaSource.consumer({ groupId: 'main' });
  await consumer.connect();
  console.log('consumer connected');

  await consumer.subscribe({ topics: ['territories'], fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const decodedMessage = message.value.toString();
      const territory = JSON.parse(decodedMessage);
      console.log(territory);
      await PostgresDataSource.createQueryBuilder()
        .insert()
        .into('territories')
        .values(territory)
        .execute();
    },
  });
}

init();
