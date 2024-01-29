import { Controller } from "@/presentation/protocols/controller"
import { makeDbAuthentication } from "@/main/factories/usecases/user/db-authentication-factory"
import { makeLogControllerDecorator } from "@/main/factories/decorators/log-controller-decorator-factory"
import { SignInController } from "@/presentation/controllers/user/signin.controller"
import { ZodAdapter } from "@/infrastructure/validator/zod-adapter"
import { HttpInputValidator } from "@/presentation/validation/http-input-validator"
import { signInSchema } from "@/infrastructure/validator/schemas/signIn-validation-schema"

export const makeSignInController = (): Controller => {
  const validator = new ZodAdapter(signInSchema)
  const signInValidator = new HttpInputValidator(validator)
  const controller = new SignInController(makeDbAuthentication(), signInValidator)
  return makeLogControllerDecorator(controller)
}
