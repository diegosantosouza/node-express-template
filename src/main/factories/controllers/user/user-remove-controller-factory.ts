import { Controller } from "@/presentation/protocols/controller"
import { makeDbRemoveUser } from "@/main/factories/usecases/user/db-remove-user-factory"
import { UserRemoveController } from "@/presentation/controllers/user/user-remove.controller"
import { makeLogControllerDecorator } from "@/main/factories/decorators/log-controller-decorator-factory"

export const makeUserRemoveController = (): Controller => {
  const controller = new UserRemoveController(makeDbRemoveUser())
  return makeLogControllerDecorator(controller)
}
