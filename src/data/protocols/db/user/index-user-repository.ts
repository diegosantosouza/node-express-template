import { IndexUser } from '@/domain/usecases/user'

export interface IndexUserRepository {
  index: (params: IndexUserRepository.Params) => Promise<IndexUserRepository.Result>
}

export namespace IndexUserRepository {
  export type Params = IndexUser.Params
  export type Result = IndexUser.Result
}
