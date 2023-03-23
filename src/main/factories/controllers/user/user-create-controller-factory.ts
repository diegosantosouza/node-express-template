import { UserCreateController } from "@/presentation/controllers/user/user-create.controller"
import { Controller } from "@/presentation/protocols/controller"
import { makeDbCreateUser } from "@/main/factories/usecases/user/db-create-user-factory"
import { makeLogControllerDecorator } from "@/main/factories/decorators/log-controller-decorator-factory"

export const makeUserCreateController = (): Controller => {
  const controller = new UserCreateController(makeDbCreateUser())
  return makeLogControllerDecorator(controller)
}
