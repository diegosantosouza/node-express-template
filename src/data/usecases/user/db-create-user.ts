import { CreateUserRepository } from "@/data/protocols/db/user";
import { Hasher } from "@/data/protocols/cryptografy";
import { CreateUser } from "@/domain/usecases/user";

export class DbCreateUser implements CreateUser {
  constructor(
    private readonly hasher: Hasher,
    private readonly createUserRepository: CreateUserRepository
  ) { }
  async create(data: CreateUser.Params): Promise<CreateUser.Result> {
    const hashedPassword = await this.hasher.hash(data.password)
    const newUser = await this.createUserRepository.create({ ...data, password: hashedPassword })
    return newUser
  }

}
