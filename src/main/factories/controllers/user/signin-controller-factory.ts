import { Controller } from "@/presentation/protocols/controller"
import { makeDbAuthentication } from "@/main/factories/usecases/user/db-authentication-factory"
import { makeLogControllerDecorator } from "@/main/factories/decorators/log-controller-decorator-factory"
import { SignInController } from "@/presentation/controllers/user/signin.controller"

export const makeSignInController = (): Controller => {
  const controller = new SignInController(makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
