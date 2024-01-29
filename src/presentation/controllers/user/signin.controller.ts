import { Authentication } from '@/domain/usecases/authentication'
import { serverError, ok, unauthorized, badRequest } from '@/presentation/helpers'
import { Controller } from '@/presentation/protocols/controller'
import { HttpResponse } from '@/presentation/protocols/http'
import { HttpInputValidator } from '@/presentation/validation/http-input-validator'

export class SignInController implements Controller {
  constructor(
    private readonly authentication: Authentication,
    private readonly validator: HttpInputValidator
  ) { }
  async handle(request: SignInController.Request): Promise<HttpResponse> {
    try {
      const validationError = this.validator.execute(request)
      if (validationError) {
        return badRequest(validationError);
      }

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
