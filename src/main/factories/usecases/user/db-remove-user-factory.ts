import { DbRemoveUser } from "@/data/usecases/user";
import { DeleteUser } from "@/domain/usecases/user";
import { UserRepository } from "@/infrastructure/db/mongodb/repositories/user-repository";

export const makeDbRemoveUser = (): DeleteUser => {
  const userRepository = new UserRepository()
  return new DbRemoveUser(userRepository)
}
