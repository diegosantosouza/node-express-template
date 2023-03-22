import { DbShowUser } from "@/data/usecases/user";
import { ShowUser } from "@/domain/usecases/user";
import { UserRepository } from "@/infrastructure/db/mongodb/repositories/user-repository";

export const makeDbShowUser = (): ShowUser => {
  const userRepository = new UserRepository()
  return new DbShowUser(userRepository)
}
