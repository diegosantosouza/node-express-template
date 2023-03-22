import { CreateUser } from '@/domain/usecases/user'
import { serverError, response } from '@/presentation/helpers'
import { Controller } from '@/presentation/protocols/controller'
import { HttpResponse } from '@/presentation/protocols/http'

export class UserCreateController implements Controller {
  constructor(private readonly userCreate: CreateUser) { }
  async handle(request: UserCreateController.Request): Promise<HttpResponse> {
    try {
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
