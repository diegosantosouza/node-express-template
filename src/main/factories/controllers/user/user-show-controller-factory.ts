import { Controller } from "@/presentation/protocols/controller"
import { UserShowController } from "@/presentation/controllers/user/user-show.controller"
import { makeDbShowUser } from "../../usecases/user/db-show-user-factory"

export const makeUserShowController = (): Controller => {
  const userShow = makeDbShowUser()
  return new UserShowController(userShow)
}
