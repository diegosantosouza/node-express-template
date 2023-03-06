import { UserModel } from "@/domain/models/user";

export interface CreateUser {
  create: (data: CreateUser.Params) => Promise<CreateUser.Result>;
}

export namespace CreateUser {
  export type Params = Omit<UserModel, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>

  export type Result = Omit<UserModel, 'password'>
}
