/* eslint-disable import/prefer-default-export */
export async function territoriesRoutes(fastify, options) {
  fastify.get('/create', async (request, reply) => {
    console.log('created territory');
  });
}
