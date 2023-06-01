import { unauthorized, badRequest, serverError, notFound } from '@/main/docs/components';
import { healthcheckSchema, signinParamsSchema, signinSchema, errorSchema } from '@/main/docs/schemas';
import { healthcheckPath, signinPath } from '@/main/docs/paths'
export default {
  openapi: '3.0.0',
  info: {
    title: 'node-express-template',
    description: 'Boilerplate for projects',
    version: '1.0.0',
  },
  servers: [
    {
      url: '/',
      description: "Base path",
    }
  ],
  paths: {
    '/healthcheck': healthcheckPath,
    '/signin': signinPath,
  },
  schemas: {
    healthcheck: healthcheckSchema,
    signinParams: signinParamsSchema,
    signin: signinSchema,
    error: errorSchema,
  },
  components: {
    badRequest,
    unauthorized,
    serverError,
    notFound,
  }
}
