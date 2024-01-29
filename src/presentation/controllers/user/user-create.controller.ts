import { CreateUser } from '@/domain/usecases/user'
import { serverError, response, badRequest } from '@/presentation/helpers'
import { Controller } from '@/presentation/protocols/controller'
import { HttpResponse } from '@/presentation/protocols/http'
import { HttpInputValidator } from '@/presentation/validation/http-input-validator'

export class UserCreateController implements Controller {
  constructor(
    private readonly userCreate: CreateUser,
    private readonly validator: HttpInputValidator
  ) { }
  async handle(request: UserCreateController.Request): Promise<HttpResponse> {
    try {
      const validationError = this.validator.execute(request)
      if (validationError) {
        return badRequest(validationError);
      }

      const newUser = await this.userCreate.create(request.body)
      return response(201, newUser)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}

export namespace UserCreateController {
  export type Request = {
    body: CreateUser.Params
  }
}
