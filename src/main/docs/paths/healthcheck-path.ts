export const healthcheckPath = {
  get: {
    tags: ['Healthcheck'],
    summary: 'healthcheck API status',
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/healthcheck'
            }
          }
        }
      }
    }
  }
}
