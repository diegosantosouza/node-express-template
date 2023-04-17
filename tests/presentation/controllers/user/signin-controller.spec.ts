import { SignInController } from '@/presentation/controllers/user/signin.controller'
import { serverError, unauthorized, ok } from '@/presentation/helpers'
import { faker } from "@faker-js/faker"
import { throwError } from '@/tests/domain/mocks/throw-error-helper'
import { AuthenticationSpy } from '@/tests/data/usecases/user/mocks/mock-db-authentication'

const mockRequest = (): SignInController.Request => ({
  body: {
    email: faker.internet.email(),
    password: faker.internet.password()
  }
})

type SutTypes = {
  sut: SignInController
  authenticationSpy: AuthenticationSpy
}

const makeSut = (): SutTypes => {
  const authenticationSpy = new AuthenticationSpy()
  const sut = new SignInController(authenticationSpy)
  return {
    sut,
    authenticationSpy,
  }
}

describe('SignIn Controller', () => {
  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(authenticationSpy.params).toEqual({
      email: request.body.email,
      password: request.body.password
    })
  })

  test('Should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationSpy } = makeSut()
    authenticationSpy.result = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(unauthorized())
  })

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationSpy } = makeSut()
    jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 if valid credentials are provided', async () => {
    const { sut, authenticationSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(authenticationSpy.result))
  })
})
