import { IndexUserRepository } from "@/data/protocols/db/user"
import { IndexUser } from "@/domain/usecases/user"

export class DbIndexUser implements IndexUser {
  constructor(
    private readonly indexUserRepository: IndexUserRepository
  ) { }
  async index(data: IndexUser.Params): Promise<IndexUser.Result> {
    const users = await this.indexUserRepository.index(data)
    return users
  }
}
