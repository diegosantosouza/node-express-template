import { Controller } from "@/presentation/protocols/controller"
import { UserShowController } from "@/presentation/controllers/user/user-show.controller"
import { makeDbShowUser } from "../../usecases/user/db-show-user-factory"
import { makeLogControllerDecorator } from "@/main/factories/decorators/log-controller-decorator-factory"

export const makeUserShowController = (): Controller => {
  const controller = new UserShowController(makeDbShowUser())
  return makeLogControllerDecorator(controller)
}
