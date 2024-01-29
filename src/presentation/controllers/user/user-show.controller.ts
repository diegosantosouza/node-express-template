import { ShowUser } from '@/domain/usecases/user'
import { serverError, ok, notFound, badRequest } from '@/presentation/helpers'
import { Controller } from '@/presentation/protocols/controller'
import { HttpResponse } from '@/presentation/protocols/http'
import { HttpInputValidator } from '@/presentation/validation/http-input-validator'

export class UserShowController implements Controller {
  constructor(
    private readonly userShow: ShowUser,
    private readonly validator: HttpInputValidator
  ) { }
  async handle(request: UserShowController.Request): Promise<HttpResponse> {
    const { id } = request.params
    try {
      const validationError = this.validator.execute(request)
      if (validationError) {
        return badRequest(validationError);
      }

      const user = await this.userShow.show(id)
      if (!user) return notFound()
      return ok(user)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}

export namespace UserShowController {
  export type Request = {
    params: {
      id: string
    }
  }
}
