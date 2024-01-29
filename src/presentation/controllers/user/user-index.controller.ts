import { IndexUser } from '@/domain/usecases/user'
import { serverError, ok, badRequest } from '@/presentation/helpers'
import { Controller } from '@/presentation/protocols/controller'
import { HttpResponse } from '@/presentation/protocols/http'
import { HttpInputValidator } from '@/presentation/validation/http-input-validator'

export class UserIndexController implements Controller {
  constructor(
    private readonly userIndex: IndexUser,
    private readonly validator: HttpInputValidator
  ) { }
  async handle(request: UserIndexController.Request): Promise<HttpResponse> {
    const { page = 1, limit = 10, email, roles, gender } = request.query
    const criteria: { [key: string]: unknown } = {}
    try {
      const validationError = this.validator.execute(request)
      if (validationError) {
        return badRequest(validationError);
      }

      if (email) {
        criteria.email = { $in: email }
      }
      if (roles) {
        criteria.roles = { $in: roles }
      }
      if (gender) {
        criteria.gender = { $in: gender }
      }
      const result = await this.userIndex.index({ where: criteria, page, limit })
      return ok(result)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}

export namespace UserIndexController {
  export type Request = {
    query: {
      page: number,
      limit: number,
      email: string,
      roles: string,
      gender: string,
    }
  }
}
