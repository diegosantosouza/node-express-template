import { mockUserLoadByEmailResultModel } from "@/tests/domain/mocks/user/mock-user";
import { LoadAccountByEmailRepository } from "@/data/protocols/db/user/load-account-by-email-repository";
import { Authentication } from "@/domain/usecases/authentication";
import { faker } from "@faker-js/faker"

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
  email!: string
  result = mockUserLoadByEmailResultModel()
  async loadByEmail(email: string): Promise<LoadAccountByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}

export class AuthenticationSpy implements Authentication {
  params!: Authentication.Params
  result: Authentication.Result = {
    accessToken: faker.datatype.uuid(),
    name: faker.name.firstName()
  }

  async auth(params: Authentication.Params): Promise<Authentication.Result> {
    this.params = params
    return this.result
  }
}
