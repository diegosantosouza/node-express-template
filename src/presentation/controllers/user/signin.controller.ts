import { Authentication } from '@/domain/usecases/authentication'
import { serverError, ok, unauthorized } from '@/presentation/helpers'
import { Controller } from '@/presentation/protocols/controller'
import { HttpResponse } from '@/presentation/protocols/http'

export class SignInController implements Controller {
  constructor(private readonly authentication: Authentication) { }
  async handle(request: SignInController.Request): Promise<HttpResponse> {
    try {
      const authenticationModel = await this.authentication.auth(request.body)
      if (!authenticationModel) {
        return unauthorized()
      }
      return ok(authenticationModel)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}

export namespace SignInController {
  export type Request = {
    body: {
      email: string
      password: string
    }
  }
}
