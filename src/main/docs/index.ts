import { unauthorized, badRequest, serverError, notFound, forbidden } from '@/main/docs/components'
import { healthcheckSchema, signinParamsSchema, signinSchema, errorSchema, userSchema, usersSchema, roleSchema, genderSchema, bearerAuthSchema, addUserSchema } from '@/main/docs/schemas'
import { healthcheckPath, signinPath, userPath, userIdPath } from '@/main/docs/paths'
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
  tags: [
    { name: 'Healthcheck' },
    { name: 'Signin' },
    { name: 'User' }
  ],
  paths: {
    '/healthcheck': healthcheckPath,
    '/signin': signinPath,
    '/user': userPath,
    '/user/{id}': userIdPath,
  },
  schemas: {
    healthcheck: healthcheckSchema,
    signinParams: signinParamsSchema,
    signin: signinSchema,
    error: errorSchema,
    user: userSchema,
    users: usersSchema,
    role: roleSchema,
    gender: genderSchema,
    addUser: addUserSchema,
  },
  components: {
    securitySchemes: {
      bearerAuth: bearerAuthSchema,
    },
    badRequest,
    unauthorized,
    serverError,
    notFound,
    forbidden,
  }
}
