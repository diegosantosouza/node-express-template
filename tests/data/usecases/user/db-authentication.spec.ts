import { mockAuthenticationParams } from "@/tests/domain/mocks/user/mock-user"
import { DbAuthentication } from "@/data/usecases/user"
import { EncrypterSpy, HashComparerSpy } from "@/tests/data/usecases/user/mocks/mock-cryptography"
import { throwError } from "@/tests/domain/mocks/throw-error-helper"
import { LoadAccountByEmailRepositorySpy } from "@/tests/data/usecases/user/mocks/mock-db-authentication"

type SutTypes = {
  sut: DbAuthentication
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
  hashComparerSpy: HashComparerSpy
  encrypterSpy: EncrypterSpy
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  const hashComparerSpy = new HashComparerSpy()
  const encrypterSpy = new EncrypterSpy()
  const sut = new DbAuthentication(loadAccountByEmailRepositorySpy, hashComparerSpy, encrypterSpy)
  return {
    sut,
    loadAccountByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy
  }
}

describe('DbAuthentication Usecase', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Sut should be defined', () => {
    const { sut } = makeSut()
    expect(sut).toBeDefined()
  })

  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    const authenticationParams = mockAuthenticationParams()
    await sut.auth(authenticationParams)
    expect(loadAccountByEmailRepositorySpy.email).toBe(authenticationParams.email)
  })

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByEmailRepositorySpy, 'loadByEmail').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    loadAccountByEmailRepositorySpy.result = null
    const model = await sut.auth(mockAuthenticationParams())
    expect(model).toBeNull()
  })

  test('Should call HashComparer with correct values', async () => {
    const { sut, hashComparerSpy, loadAccountByEmailRepositorySpy } = makeSut()
    const authenticationParams = mockAuthenticationParams()
    await sut.auth(authenticationParams)
    expect(hashComparerSpy.plaintext).toBe(authenticationParams.password)
    expect(hashComparerSpy.digest).toBe(loadAccountByEmailRepositorySpy.result?.password)
  })

  test('Should throw if HashComparer throws', async () => {
    const { sut, hashComparerSpy } = makeSut()
    jest.spyOn(hashComparerSpy, 'compare').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if HashComparer returns false', async () => {
    const { sut, hashComparerSpy } = makeSut()
    hashComparerSpy.isValid = false
    const model = await sut.auth(mockAuthenticationParams())
    expect(model).toBeNull()
  })

  test('Should call Encrypter with correct payload', async () => {
    const { sut, encrypterSpy, loadAccountByEmailRepositorySpy } = makeSut()
    await sut.auth(mockAuthenticationParams())
    expect(encrypterSpy.payload).toEqual({
      id: loadAccountByEmailRepositorySpy.result?.id,
      email: loadAccountByEmailRepositorySpy.result?.email,
      firstName: loadAccountByEmailRepositorySpy.result?.firstName,
      lastName: loadAccountByEmailRepositorySpy.result?.lastName,
      gender: loadAccountByEmailRepositorySpy.result?.gender,
      roles: loadAccountByEmailRepositorySpy.result?.roles,
      birthDate: loadAccountByEmailRepositorySpy.result?.birthDate,
      updatedAt: loadAccountByEmailRepositorySpy.result?.updatedAt,
      createdAt: loadAccountByEmailRepositorySpy.result?.createdAt,
      password: undefined
    })
  })

  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterSpy } = makeSut()
    jest.spyOn(encrypterSpy, 'encrypt').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an data on success', async () => {
    const { sut, encrypterSpy, loadAccountByEmailRepositorySpy } = makeSut()
    const authResult = await sut.auth(mockAuthenticationParams())
    expect(authResult?.accessToken).toBe(encrypterSpy.ciphertext)
    expect(authResult?.name).toBe(loadAccountByEmailRepositorySpy.result?.firstName)
  })
})
