import { RemoveUserRepository } from "@/data/protocols/db/user";
import { DeleteUser } from "@/domain/usecases/user";

export class DbRemoveUser implements DeleteUser {
  constructor(
    private readonly deleteUserRepository: RemoveUserRepository
  ) { }
  async delete(data: DeleteUser.Params): Promise<DeleteUser.Result> {
    const result = await this.deleteUserRepository.delete(data)
    return result
  }

}
