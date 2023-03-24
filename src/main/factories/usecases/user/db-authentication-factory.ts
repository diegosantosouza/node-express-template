import { DbAuthentication } from "@/data/usecases/user";
import { Authentication } from "@/domain/usecases/authentication";
import { BcryptAdapter, JwtAdapter } from "@/infrastructure/cryptography";
import { UserRepository } from "@/infrastructure/db/mongodb/repositories/user-repository";

export const makeDbAuthentication = (): Authentication => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter()
  const userRepository = new UserRepository()
  return new DbAuthentication(userRepository, bcryptAdapter, jwtAdapter)
}
