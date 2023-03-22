import { DbIndexUser } from "@/data/usecases/user";
import { IndexUser } from "@/domain/usecases/user";
import { UserRepository } from "@/infrastructure/db/mongodb/repositories/user-repository";

export const makeDbIndexUser = (): IndexUser => {
  const userRepository = new UserRepository()
  return new DbIndexUser(userRepository)
}
