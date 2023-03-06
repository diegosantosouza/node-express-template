import { DeleteUser } from "@/domain/usecases/user"

export interface RemoveUserRepository {
  delete: (data: RemoveUserRepository.Params) => Promise<RemoveUserRepository.Result>
}

export namespace RemoveUserRepository {
  export type Params = DeleteUser.Params
  export type Result = boolean
}
