/* eslint-disable import/extensions */
import Fastify from 'fastify';
import { routes } from './index.routes.js';

// eslint-disable-next-line import/prefer-default-export
export function buildFastify() {
  const fastify = Fastify();

  fastify.register(routes, { prefix: '/api' });

  return fastify;
}
