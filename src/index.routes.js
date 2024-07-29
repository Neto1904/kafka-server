/* eslint-disable import/extensions */
import { territoriesRoutes } from './territories.routes.js';

/* eslint-disable import/prefer-default-export */
export async function routes(fastify) {
  fastify.register(territoriesRoutes, { prefix: '/territories' });
}
