/* eslint-disable import/extensions */
import Fastify from 'fastify';
import { buildFastify } from './buildServer.js';
// import { kafkaSource } from './databases/KafkaSource.js';

// const fastify = Fastify();

// fastify.post('/api/territory', async (request, reply) => {
//   const { body } = request;
//   const producer = kafkaSource.producer();
//   await producer.connect();
//   await producer.send({
//     topic: 'territories',
//     messages: [
//       {
//         key: 'new_territory',
//         value: JSON.stringify(body),
//       },
//     ],
//   });
//   await producer.disconnect();
//   reply.status(200);
// });
const fastify = buildFastify();

try {
  await fastify.listen({ port: 3000 });
  console.log('Server running');
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
