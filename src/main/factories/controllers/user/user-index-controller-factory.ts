import { Controller } from "@/presentation/protocols/controller"
import { makeDbIndexUser } from "@/main/factories/usecases/user/db-index-user-factory"
import { UserIndexController } from "@/presentation/controllers/user/user-index.controller"
import { makeLogControllerDecorator } from "@/main/factories/decorators/log-controller-decorator-factory"
import { ZodAdapter } from "@/infrastructure/validator/zod-adapter"
import { HttpInputValidator } from "@/presentation/validation/http-input-validator"
import { indexUserRules } from "@/infrastructure/validator/schemas/index-user-validation-schema"

export const makeUserIndexController = (): Controller => {
  const validator = new ZodAdapter(indexUserRules)
  const indexUserValidator = new HttpInputValidator(validator)
  const controller = new UserIndexController(makeDbIndexUser(), indexUserValidator)
  return makeLogControllerDecorator(controller)
}
