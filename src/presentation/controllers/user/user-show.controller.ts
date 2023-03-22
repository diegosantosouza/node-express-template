import { ShowUser } from '@/domain/usecases/user'
import { serverError, ok, notFound } from '@/presentation/helpers'
import { Controller } from '@/presentation/protocols/controller'
import { HttpResponse } from '@/presentation/protocols/http'

export class UserShowController implements Controller {
  constructor(private readonly userShow: ShowUser) { }
  async handle(request: UserShowController.Request): Promise<HttpResponse> {
    const { id } = request.params
    try {
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
