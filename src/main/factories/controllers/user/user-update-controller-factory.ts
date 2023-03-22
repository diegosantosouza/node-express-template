import { Controller } from "@/presentation/protocols/controller"
import { makeDbUpdateUser } from "@/main/factories/usecases/user/db-update-user-factory"
import { UserUpdateController } from "@/presentation/controllers/user/user-update.controller"

export const makeUserUpdateController = (): Controller => {
  const userCreate = makeDbUpdateUser()
  return new UserUpdateController(userCreate)
}
