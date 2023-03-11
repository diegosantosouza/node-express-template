import { UserModel } from "@/domain/models/user"
import { PaginateOptions, PaginateResult } from "../paginate"

export interface IndexUser {
  index: (params: IndexUser.Params) => Promise<IndexUser.Result>
}

export namespace IndexUser {
  export type Params = PaginateOptions<Partial<Omit<UserModel, 'password'>>>

  export type Result = PaginateResult<Omit<UserModel, 'password'>>
}
