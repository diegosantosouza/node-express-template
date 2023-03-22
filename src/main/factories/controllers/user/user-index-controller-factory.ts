import { Controller } from "@/presentation/protocols/controller"
import { makeDbIndexUser } from "@/main/factories/usecases/user/db-index-user-factory"
import { UserIndexController } from "@/presentation/controllers/user/user-index.controller"

export const makeUserIndexController = (): Controller => {
  const userIndex = makeDbIndexUser()
  return new UserIndexController(userIndex)
}
