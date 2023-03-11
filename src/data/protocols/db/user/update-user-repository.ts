import { UpdateUser } from "@/domain/usecases/user"

export interface UpdateUserRepository {
  update: (params: UpdateUserRepository.Params) => Promise<UpdateUserRepository.Result>
}

export namespace UpdateUserRepository {
  export type Params = UpdateUser.Params
  export type Result = UpdateUser.Result
}
