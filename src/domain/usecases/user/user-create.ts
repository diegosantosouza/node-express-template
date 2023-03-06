import { UserModel } from "@/domain/models/user";

export interface CreateUser {
  create: (params: CreateUser.Params) => Promise<CreateUser.Result>;
}

export namespace CreateUser {
  export type Params = Omit<UserModel, 'id'>

  export type Result = Omit<UserModel, 'password'>
}
