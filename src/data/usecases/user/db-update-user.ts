import { UpdateUserRepository } from "@/data/protocols/db/user";
import { UpdateUser } from "@/domain/usecases/user";

export class DbUpdateUser implements UpdateUser {
  constructor(
    private readonly updateUserRepository: UpdateUserRepository
  ) { }
  async update(params: UpdateUser.Params): Promise<UpdateUser.Result> {
    const user = await this.updateUserRepository.update(params)
    return user
  }

}
