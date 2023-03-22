import { UserModel } from '@/domain/models/user'
import { UpdateUser } from '@/domain/usecases/user'
import { serverError, ok, notFound } from '@/presentation/helpers'
import { Controller } from '@/presentation/protocols/controller'
import { HttpResponse } from '@/presentation/protocols/http'

export class UserUpdateController implements Controller {
  constructor(private readonly userUpdate: UpdateUser) { }
  async handle(request: UserUpdateController.Request): Promise<HttpResponse> {
    const { id } = request.params
    try {
      const user = await this.userUpdate.update({ id, data: request.body })
      if (!user) return notFound()
      return ok(user)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}

export namespace UserUpdateController {
  export type Request = {
    params: {
      id: string
    },
    body: Partial<Omit<UserModel, 'id'>>
  }
}
