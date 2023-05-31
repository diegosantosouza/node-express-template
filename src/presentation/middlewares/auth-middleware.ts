import { forbidden, ok, serverError } from '@/presentation/helpers'
import { AccessDeniedError } from '@/presentation/errors'
import { Middleware } from '../protocols/middleware'
import { HttpResponse } from '../protocols/http'
import { LoadAccountByToken } from '@/domain/usecases/user'

export class AuthMiddleware implements Middleware {
  constructor(
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string
  ) { }

  async handle(request: AuthMiddleware.Request): Promise<HttpResponse> {
    try {
      const authentication = request.headers['authorization']
      if(!authentication) return forbidden(new AccessDeniedError())

      const [, token] = authentication.split(' ')
      if (token) {

        const account = await this.loadAccountByToken.load(token, this.role)
        if (account) return ok({ user: account })
      }
      return forbidden(new AccessDeniedError())
    } catch (error) {
      return serverError(error as Error)
    }
  }
}

export namespace AuthMiddleware {
  export type Request = {
    headers: {
      authorization?: string
    }
  }
}
