import { DeleteUser } from '@/domain/usecases/user'
import { serverError, ok } from '@/presentation/helpers'
import { Controller } from '@/presentation/protocols/controller'
import { HttpResponse } from '@/presentation/protocols/http'

export class UserRemoveController implements Controller {
  constructor(private readonly userRemove: DeleteUser) { }
  async handle(request: UserRemoveController.Request): Promise<HttpResponse> {
    const { id } = request.params
    try {
      const user = await this.userRemove.delete(id)
      return ok(user)
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
