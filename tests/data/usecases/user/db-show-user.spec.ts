import { mockShowUserParams } from "@/tests/domain/mocks/user/mock-user"
import { DbShowUser } from "@/data/usecases/user"
import { ShowUserRepositorySpy } from "@/tests/data/usecases/user/mocks/mock-db-user"
import { throwError } from "@/tests/domain/mocks/throw-error-helper"

type SutTypes = {
  sut: DbShowUser
  showUserRepositorySpy: ShowUserRepositorySpy
}

const makeSut = (): SutTypes => {
  const showUserRepositorySpy = new ShowUserRepositorySpy()
  const sut = new DbShowUser(showUserRepositorySpy)
  return {
    sut,
    showUserRepositorySpy
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

  test('Should return throw if ShowUserRepository returns throw', async () => {
    const { sut, showUserRepositorySpy } = makeSut()
    jest.spyOn(showUserRepositorySpy, 'show').mockImplementationOnce(throwError)
    const promise = sut.show(mockShowUserParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call showUserRepository with correct values', async () => {
    const { sut, showUserRepositorySpy } = makeSut()
    const showUserParams = mockShowUserParams()
    await sut.show(showUserParams)
    expect(showUserRepositorySpy.params).toEqual(showUserParams)
  })

  test('Should return objectId on success', async () => {
    const { sut } = makeSut()
    const isValid = await sut.show(mockShowUserParams())
    expect(isValid).toHaveProperty('id')
  })
})
