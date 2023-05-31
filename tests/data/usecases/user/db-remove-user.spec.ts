import { mockDeleteUserParams } from "@/tests/domain/mocks/user/mock-user"
import { DbRemoveUser } from "@/data/usecases/user"
import { RemoveUserRepositorySpy } from "@/tests/data/usecases/user/mocks/mock-db-user"
import { throwError } from "@/tests/domain/mocks/throw-error-helper"

type SutTypes = {
  sut: DbRemoveUser
  removeUserRepositorySpy: RemoveUserRepositorySpy
}

const makeSut = (): SutTypes => {
  const removeUserRepositorySpy = new RemoveUserRepositorySpy()
  const sut = new DbRemoveUser(removeUserRepositorySpy)
  return {
    sut,
    removeUserRepositorySpy
  }
}

describe('DbRemoveUser Usecase', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Sut should be defined', () => {
    const { sut } = makeSut()
    expect(sut).toBeDefined()
  })

  test('Should return throw if RemoveUserRepository returns throw', async () => {
    const { sut, removeUserRepositorySpy } = makeSut()
    jest.spyOn(removeUserRepositorySpy, 'delete').mockImplementationOnce(throwError)
    const promise = sut.delete(mockDeleteUserParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call RemoveUserRepository with correct values', async () => {
    const { sut, removeUserRepositorySpy } = makeSut()
    const deleteUserParams = mockDeleteUserParams()
    await sut.delete(deleteUserParams)
    expect(removeUserRepositorySpy.params).toEqual(deleteUserParams)
  })

  test('Should return true on success', async () => {
    const { sut } = makeSut()
    const isValid = await sut.delete(mockDeleteUserParams())
    expect(isValid).toBeTruthy()
  })

  test('Should return false on fail', async () => {
    const { sut, removeUserRepositorySpy } = makeSut()
    removeUserRepositorySpy.result = false
    const isValid = await sut.delete(mockDeleteUserParams())
    expect(isValid).toBeFalsy()
  })
})
