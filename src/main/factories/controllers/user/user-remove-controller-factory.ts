import { Controller } from "@/presentation/protocols/controller"
import { makeDbRemoveUser } from "@/main/factories/usecases/user/db-remove-user-factory"
import { UserRemoveController } from "@/presentation/controllers/user/user-remove.controller"
import { makeLogControllerDecorator } from "@/main/factories/decorators/log-controller-decorator-factory"
import { HttpInputValidator } from "@/presentation/validation/http-input-validator"
import { ZodAdapter } from "@/infrastructure/validator/zod-adapter"
import { validIdRule } from "@/infrastructure/validator/schemas/id-validation-schema"

export const makeUserRemoveController = (): Controller => {
  const validator = new ZodAdapter(validIdRule)
  const removeUserValidator = new HttpInputValidator(validator)
  const controller = new UserRemoveController(makeDbRemoveUser(),removeUserValidator)
  return makeLogControllerDecorator(controller)
}
