import { mockCreateUserParams } from "@/tests/domain/mocks/user/mock-user"
import { DbCreateUser } from "@/data/usecases/user"
import { HasherSpy } from "@/tests/data/usecases/user/mocks/mock-cryptography"
import { CreateUserRepositorySpy } from "@/tests/data/usecases/user/mocks/mock-db-user"
import { throwError } from "@/tests/domain/mocks/throw-error-helper"

type SutTypes = {
  sut: DbCreateUser
  hasherSpy: HasherSpy
  createUserRepositorySpy: CreateUserRepositorySpy
}

const makeSut = (): SutTypes => {
  const hasherSpy = new HasherSpy()
  const createUserRepositorySpy = new CreateUserRepositorySpy()
  const sut = new DbCreateUser(hasherSpy, createUserRepositorySpy)
  return {
    sut,
    hasherSpy,
    createUserRepositorySpy
  }
}

describe('DbCreateUser Usecase', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Sut should be defined', () => {
    const { sut } = makeSut()
    expect(sut).toBeDefined()
  })

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherSpy } = makeSut()
    jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(throwError)
    const promise = sut.create(mockCreateUserParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call CreateUserRepository with correct values', async () => {
    const { sut, createUserRepositorySpy, hasherSpy } = makeSut()
    const createUserParams = mockCreateUserParams()
    await sut.create(createUserParams)
    expect(createUserRepositorySpy.params).toEqual({
      firstName: createUserParams.firstName,
      lastName: createUserParams.lastName,
      password: hasherSpy.digest,
      birthDate: createUserParams.birthDate,
      email: createUserParams.email,
      roles: createUserParams.roles,
      gender: createUserParams.gender
    })
  })

  test('Should return objectId on success', async () => {
    const { sut } = makeSut()
    const isValid = await sut.create(mockCreateUserParams())
    expect(isValid).toHaveProperty('id')
  })

  test('Should return throw if CreateUserRepository returns throw', async () => {
    const { sut, createUserRepositorySpy } = makeSut()
    jest.spyOn(createUserRepositorySpy, 'create').mockImplementationOnce(throwError)
    await expect(sut.create(mockCreateUserParams())).rejects.toThrow();
  })
})
