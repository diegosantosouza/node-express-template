import { DbCreateUser } from "@/data/usecases/user";
import { CreateUser } from "@/domain/usecases/user";
import { BcryptAdapter } from "@/infrastructure/cryptography";
import { UserRepository } from "@/infrastructure/db/mongodb/repositories/user-repository";

export const makeDbCreateUser = (): CreateUser => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const userRepository = new UserRepository()
  return new DbCreateUser(bcryptAdapter, userRepository)
}
