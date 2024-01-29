import { Controller } from "@/presentation/protocols/controller"
import { UserShowController } from "@/presentation/controllers/user/user-show.controller"
import { makeDbShowUser } from "../../usecases/user/db-show-user-factory"
import { makeLogControllerDecorator } from "@/main/factories/decorators/log-controller-decorator-factory"
import { validIdRule } from "@/infrastructure/validator/schemas/id-validation-schema"
import { ZodAdapter } from "@/infrastructure/validator/zod-adapter"
import { HttpInputValidator } from "@/presentation/validation/http-input-validator"

export const makeUserShowController = (): Controller => {
  const validator = new ZodAdapter(validIdRule)
  const idValidator = new HttpInputValidator(validator)
  const controller = new UserShowController(makeDbShowUser(), idValidator)
  return makeLogControllerDecorator(controller)
}
