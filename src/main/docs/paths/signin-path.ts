export const signinPath = {
  post: {
    tags: ['Signin'],
    summary: 'Signin authenticate',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/signinParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/signin'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      401: {
        $ref: '#/components/unauthorized'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
