import { DbUpdateUser } from "@/data/usecases/user";
import { UpdateUser } from "@/domain/usecases/user";
import { UserRepository } from "@/infrastructure/db/mongodb/repositories/user-repository";

export const makeDbUpdateUser = (): UpdateUser => {
  const userRepository = new UserRepository()
  return new DbUpdateUser(userRepository)
}
