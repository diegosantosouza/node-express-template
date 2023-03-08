import { UserModel } from "@/domain/models/user";

export interface IndexUser {
  index: (params: IndexUser.Params) => Promise<IndexUser.Result>;
}

export namespace IndexUser {
  export type Params = Partial<Omit<UserModel, 'password'>>

  export type Result = Array<Omit<UserModel, 'password'>>
}
