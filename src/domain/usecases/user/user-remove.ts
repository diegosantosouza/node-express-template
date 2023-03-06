import { UserModel } from "@/domain/models/user";

export interface DeleteUser {
  delete: (param: DeleteUser.Params) => Promise<DeleteUser.Result>;
}

export namespace DeleteUser {
  export type Params = UserModel['id']

  export type Result = boolean
}
