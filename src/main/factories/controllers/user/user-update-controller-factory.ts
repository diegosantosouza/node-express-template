import { Controller } from "@/presentation/protocols/controller"
import { makeDbUpdateUser } from "@/main/factories/usecases/user/db-update-user-factory"
import { UserUpdateController } from "@/presentation/controllers/user/user-update.controller"
import { makeLogControllerDecorator } from "@/main/factories/decorators/log-controller-decorator-factory"
import { ZodAdapter } from "@/infrastructure/validator/zod-adapter"
import { HttpInputValidator } from "@/presentation/validation/http-input-validator"
import { userUpdateSchema } from "@/infrastructure/validator/schemas/user-update-validation-schema"

export const makeUserUpdateController = (): Controller => {
  const validator = new ZodAdapter(userUpdateSchema)
  const updateUserValidator = new HttpInputValidator(validator)
  const controller = new UserUpdateController(makeDbUpdateUser(), updateUserValidator)
  return makeLogControllerDecorator(controller)
}
