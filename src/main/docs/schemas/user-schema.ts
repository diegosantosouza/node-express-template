export const userSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    birthDate: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
    roles: { type: 'array', items: { $ref: '#/schemas/role' } },
    gender: { type: 'string' },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
    deletedAt: { type: 'string' },
  }
}
