import { UserCreateController } from "@/presentation/controllers/user/user-create.controller"
import { Controller } from "@/presentation/protocols/controller"
import { makeDbCreateUser } from "@/main/factories/usecases/user/db-create-user-factory"
import { makeLogControllerDecorator } from "@/main/factories/decorators/log-controller-decorator-factory"
import { HttpInputValidator } from "@/presentation/validation/http-input-validator"
import { UserCreateSchema } from "@/infrastructure/validator/schemas/user-validation-schema"
import { ZodAdapter } from "@/infrastructure/validator/zod-adapter"

export const makeUserCreateController = (): Controller => {
  const validator = new ZodAdapter(UserCreateSchema)
  const userCreateValidator = new HttpInputValidator(validator)
  const controller = new UserCreateController(makeDbCreateUser(), userCreateValidator)
  return makeLogControllerDecorator(controller)
}
