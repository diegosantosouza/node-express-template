import { mockIndexUserResult, mockUpdateUserResult, mockUserResultModel } from "@/tests/domain/mocks/user/mock-user";
import { CreateUserRepository, IndexUserRepository, RemoveUserRepository, ShowUserRepository, UpdateUserRepository } from "@/data/protocols/db/user"
import { mockPaginateResult } from "@/tests/domain/mocks/mock-paginate";

export class CreateUserRepositorySpy implements CreateUserRepository {
  params!: CreateUserRepository.Params
  result = mockUserResultModel()
  async create(data: CreateUserRepository.Params): Promise<CreateUserRepository.Result> {
    this.params = data
    return this.result
  }
}

export class UpdateUserRepositorySpy implements UpdateUserRepository {
  params!: UpdateUserRepository.Params
  result = mockUpdateUserResult()
  async update(data: UpdateUserRepository.Params): Promise<UpdateUserRepository.Result> {
    this.params = data
    return this.result
  }
}

export class ShowUserRepositorySpy implements ShowUserRepository {
  params!: string
  result = mockUserResultModel()
  async show(data: ShowUserRepository.Params): Promise<ShowUserRepository.Result> {
    this.params = data
    return this.result
  }
}

export class IndexUserRepositorySpy implements IndexUserRepository {
  params!: IndexUserRepository.Params
  result = mockPaginateResult(mockIndexUserResult())
  async index(data: IndexUserRepository.Params): Promise<IndexUserRepository.Result> {
    this.params = data
    return this.result
  }
}

export class RemoveUserRepositorySpy implements RemoveUserRepository {
  params!: string
  result = true
  async delete(data: RemoveUserRepository.Params): Promise<RemoveUserRepository.Result> {
    this.params = data
    return this.result
  }
}
