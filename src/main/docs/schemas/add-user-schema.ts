export const addUserSchema = {
  type: 'object',
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    birthDate: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
    roles: { type: 'array', items: { $ref: '#/schemas/role' } },
    gender: { type: 'string' },
  },
  required: ['firstName', 'lastName', 'email', 'password', 'roles']
}
