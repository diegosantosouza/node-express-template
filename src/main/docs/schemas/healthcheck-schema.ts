export const healthcheckSchema = {
  type: 'object',
  properties: {
    status: { type: 'string' },
    version: { type: 'string' },
    host: { type: 'string' },
  }
}
