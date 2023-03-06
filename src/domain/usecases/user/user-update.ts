import { UserModel } from "@/domain/models/user";

export interface UpdateUser {
  update: (data: UpdateUser.Params) => Promise<UpdateUser.Result>;
}

export namespace UpdateUser {
  export type Params = Omit<UserModel, 'id'>

  export type Result = Omit<UserModel, 'password'>
}
