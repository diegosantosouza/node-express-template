import { Controller } from "@/presentation/protocols/controller"
import { makeDbIndexUser } from "@/main/factories/usecases/user/db-index-user-factory"
import { UserIndexController } from "@/presentation/controllers/user/user-index.controller"
import { makeLogControllerDecorator } from "@/main/factories/decorators/log-controller-decorator-factory"

export const makeUserIndexController = (): Controller => {
  const controller = new UserIndexController(makeDbIndexUser())
  return makeLogControllerDecorator(controller)
}
