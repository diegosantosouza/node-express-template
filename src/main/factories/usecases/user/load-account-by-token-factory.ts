import { DbLoadAccountByToken } from "@/data/usecases/user"
import { LoadAccountByToken } from "@/domain/usecases/user"
import { JwtAdapter } from "@/infrastructure/cryptography"

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter()
  const accountMongoRepository = new AccountMongoRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository)
}
