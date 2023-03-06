import { UserModel } from "@/domain/models/user"
import { ShowUser } from "@/domain/usecases/user"

export interface ShowUserRepository {
  show: (params: ShowUserRepository.Params) => Promise<ShowUserRepository.Result>
}

export namespace ShowUserRepository {
  export type Params = ShowUser.Params
  export type Result = UserModel
}
