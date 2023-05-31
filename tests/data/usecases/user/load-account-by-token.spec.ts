import { Decrypter } from "@/data/protocols/cryptografy"
import { DbLoadAccountByToken } from "@/data/usecases/user"
import { mockUserResultModel } from "@/tests/domain/mocks/user/mock-user"

type SutTypes = {
  sut: DbLoadAccountByToken
  decrypterStub: Decrypter
}

const makeDecrypter = () : Decrypter => {
  class DecrypterStub implements Decrypter {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async decrypt(value: string): Promise<string> {
      return Promise.resolve('any_value')
    }
  }
  return new DecrypterStub()
}

const makeSut = () : SutTypes => {
  const decrypterStub = makeDecrypter()
  const sut = new DbLoadAccountByToken(decrypterStub)
  return {
    sut,
    decrypterStub,
  }
}

describe('DbLoadAccountByToken Usecase', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Sut should be defined', () => {
    const { sut } = makeSut()
    expect(sut).toBeDefined()
  })

  test('Should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token', 'any_role')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })

  test('Should return null if Decrypter returns null', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(Promise.resolve(''))
    const account = await sut.load('any_token', 'any_role')
    expect(account).toBeNull()
  })

  test('Should return user account on success', async () => {
    const { sut, decrypterStub } = makeSut()
    const accountUser = mockUserResultModel()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(Promise.resolve(accountUser))
    const account = await sut.load('any_token', accountUser.roles[0])
    expect(account).toEqual({
      id: accountUser.id,
      firstName: accountUser.firstName,
      lastName: accountUser.lastName,
      email: accountUser.email,
      roles: accountUser.roles,
      gender: accountUser.gender,
      birthDate: accountUser.birthDate,
      createdAt: accountUser.createdAt,
      updatedAt: accountUser.updatedAt,
    })
  })

  test('Should return null if role fail', async () => {
    const { sut, decrypterStub } = makeSut()
    const accountUser = mockUserResultModel()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(Promise.resolve(accountUser))
    const account = await sut.load('any_token', 'any_role')
    expect(account).toBeNull()
  })
})
