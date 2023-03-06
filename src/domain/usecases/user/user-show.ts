import { UserModel } from "@/domain/models/user";

export interface ShowUser {
  show: (params: ShowUser.Params) => Promise<ShowUser.Result>;
}

export namespace ShowUser {
  export type Params = UserModel['id']

  export type Result = boolean
}
