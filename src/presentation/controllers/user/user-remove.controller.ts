import { DeleteUser } from '@/domain/usecases/user'
import { serverError, noContent, badRequest } from '@/presentation/helpers'
import { Controller } from '@/presentation/protocols/controller'
import { HttpResponse } from '@/presentation/protocols/http'
import { HttpInputValidator } from '@/presentation/validation/http-input-validator'

export class UserRemoveController implements Controller {
  constructor(
    private readonly userRemove: DeleteUser,
    private readonly validator: HttpInputValidator
  ) { }
  async handle(request: UserRemoveController.Request): Promise<HttpResponse> {
    const validationError = this.validator.execute(request)
      if (validationError) {
        return badRequest(validationError);
      }

    const { id } = request.params
    try {
      await this.userRemove.delete(id)
      return noContent()
    } catch (error) {
      return serverError(error as Error)
    }
  }
}

export namespace UserRemoveController {
  export type Request = {
    params: {
      id: string
    }
  }
}
