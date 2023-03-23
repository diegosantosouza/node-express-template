import { Controller } from "@/presentation/protocols/controller"
import { makeDbUpdateUser } from "@/main/factories/usecases/user/db-update-user-factory"
import { UserUpdateController } from "@/presentation/controllers/user/user-update.controller"
import { makeLogControllerDecorator } from "@/main/factories/decorators/log-controller-decorator-factory"

export const makeUserUpdateController = (): Controller => {
  const controller = new UserUpdateController(makeDbUpdateUser())
  return makeLogControllerDecorator(controller)
}
