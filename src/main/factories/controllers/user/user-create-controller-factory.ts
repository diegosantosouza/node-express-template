import { UserCreateController } from "@/presentation/controllers/user/user-create.controller"
import { Controller } from "@/presentation/protocols/controller"
import { makeDbCreateUser } from "@/main/factories/usecases/user/db-create-user-factory"

export const makeUserCreateController = (): Controller => {
  const userCreate = makeDbCreateUser()
  return new UserCreateController(userCreate)
}
