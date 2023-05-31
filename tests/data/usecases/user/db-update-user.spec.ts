import { mockUpdateUserParams } from "@/tests/domain/mocks/user/mock-user"
import { DbUpdateUser } from "@/data/usecases/user"
import { UpdateUserRepositorySpy } from "@/tests/data/usecases/user/mocks/mock-db-user"
import { throwError } from "@/tests/domain/mocks/throw-error-helper"

type SutTypes = {
  sut: DbUpdateUser
  updateUserRepositorySpy: UpdateUserRepositorySpy
}

const makeSut = (): SutTypes => {
  const updateUserRepositorySpy = new UpdateUserRepositorySpy()
  const sut = new DbUpdateUser(updateUserRepositorySpy)
  return {
    sut,
    updateUserRepositorySpy
  }
}

describe('DbUpdateUser Usecase', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Sut should be defined', () => {
    const { sut } = makeSut()
    expect(sut).toBeDefined()
  })

  test('Should throw if UpdateUserRepository returns throw', async () => {
    const { sut, updateUserRepositorySpy } = makeSut()
    jest.spyOn(updateUserRepositorySpy, 'update').mockImplementationOnce(throwError)
    const promise = sut.update(mockUpdateUserParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call UpdateUserRepository with optional values', async () => {
    const { sut, updateUserRepositorySpy } = makeSut()
    const updateUserParams = mockUpdateUserParams()
    await sut.update(updateUserParams)
    expect(updateUserRepositorySpy.params).toEqual({
      id: updateUserParams.id,
      data: {
        firstName: updateUserParams.data.firstName,
        lastName: updateUserParams.data.lastName,
        password: updateUserParams.data.password,
        birthDate: updateUserParams.data.birthDate,
        email: updateUserParams.data.email,
        roles: updateUserParams.data.roles,
        gender: updateUserParams.data.gender
      }
    })
  })

  test('Should return objectId on success', async () => {
    const { sut } = makeSut()
    const isValid = await sut.update(mockUpdateUserParams())
    expect(isValid).toHaveProperty('id')
  })
})
