import { CreateUser, LoadAccountByToken } from '@/domain/usecases/user'
import { mockUserResultModel } from '@/tests/domain/mocks/user/mock-user'

export class LoadAccountByTokenSpy implements LoadAccountByToken {
  accessToken?: string
  role?: string
  result: CreateUser.Result | null = mockUserResultModel()

  async load (accessToken: string, role?: string): Promise<LoadAccountByToken.Result> {
    this.accessToken = accessToken
    this.role = role
    return this.result
  }
}
