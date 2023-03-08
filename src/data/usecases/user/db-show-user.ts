import { ShowUserRepository } from "@/data/protocols/db/user";
import { ShowUser } from "@/domain/usecases/user";

export class DbShowUser implements ShowUser {
  constructor(
    private readonly showUserRepository: ShowUserRepository
  ) { }
  async show(data: ShowUser.Params): Promise<ShowUser.Result> {
    const user = await this.showUserRepository.show(data)
    return user
  }
}
