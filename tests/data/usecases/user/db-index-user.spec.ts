import { mockIndexUserParams } from "@/tests/domain/mocks/user/mock-user"
import { DbIndexUser } from "@/data/usecases/user"
import { IndexUserRepositorySpy } from "@/tests/data/usecases/user/mocks/mock-db-user"
import { throwError } from "@/tests/domain/mocks/throw-error-helper"

type SutTypes = {
  sut: DbIndexUser
  indexUserRepositorySpy: IndexUserRepositorySpy
}

const makeSut = (): SutTypes => {
  const indexUserRepositorySpy = new IndexUserRepositorySpy()
  const sut = new DbIndexUser(indexUserRepositorySpy)
  return {
    sut,
    indexUserRepositorySpy
  }
}

describe('DbShowUser Usecase', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Sut should be defined', () => {
    const { sut } = makeSut()
    expect(sut).toBeDefined()
  })

  test('Should return throw if IndexUserRepository returns throw', async () => {
    const { sut, indexUserRepositorySpy } = makeSut()
    jest.spyOn(indexUserRepositorySpy, 'index').mockImplementationOnce(throwError)
    const promise = sut.index(mockIndexUserParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call indexUserRepository with correct values', async () => {
    const { sut, indexUserRepositorySpy } = makeSut()
    const indexUserParams = mockIndexUserParams()
    await sut.index(indexUserParams)
    expect(indexUserRepositorySpy.params).toEqual({
      where: indexUserParams.where,
      page: indexUserParams.page,
      limit: indexUserParams.limit
    })
  })

  test('Should return array of object on success', async () => {
    const { sut } = makeSut()
    const result = await sut.index(mockIndexUserParams())
    expect(result.items).toHaveLength(1)
  })
})
