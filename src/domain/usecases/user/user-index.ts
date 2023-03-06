import { UserModel } from "@/domain/models/user";

export interface IndexUser {
  index: (params: IndexUser.Params) => Promise<IndexUser.Result>;
}

export namespace IndexUser {
  export type Params = Partial<Omit<UserModel, 'id' | 'password'>>

  export type Result = UserModel[]
}
