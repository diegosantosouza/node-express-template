import { SignInController } from '@/presentation/controllers/user/signin.controller'
import { serverError, unauthorized, ok, badRequest } from '@/presentation/helpers'
import { faker } from "@faker-js/faker"
import { throwError } from '@/tests/domain/mocks/throw-error-helper'
import { AuthenticationSpy } from '@/tests/data/usecases/user/mocks/mock-db-authentication'
import { HttpInputValidator } from '@/presentation/validation/http-input-validator'
import { ZodAdapter } from '@/infrastructure/validator/zod-adapter'
import { signInSchema } from '@/infrastructure/validator/schemas/signIn-validation-schema'

jest.mock('@/presentation/validation/http-input-validator');

const mockRequest = (): SignInController.Request => ({
  body: {
    email: faker.internet.email(),
    password: faker.internet.password()
  }
})

const validationErrorResult =
  [
    {
      code: "invalid_string",
      expected: "",
      received: "",
      path: [
        "body",
        "email",
      ],
      message: "Invalid email",
    },
  ]

type SutTypes = {
  sut: SignInController
  authenticationSpy: AuthenticationSpy
  httpInputValidatorMock: HttpInputValidator
  validatorMock: ZodAdapter
}

const makeSut = (): SutTypes => {
  const validatorMock = new ZodAdapter(signInSchema)
  const httpInputValidatorMock = new HttpInputValidator(validatorMock)
  const authenticationSpy = new AuthenticationSpy()
  const sut = new SignInController(authenticationSpy, httpInputValidatorMock)
  return {
    sut,
    authenticationSpy,
    validatorMock,
    httpInputValidatorMock
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

  test('Should return 400 if invalid input fields', async () => {
    const { sut, httpInputValidatorMock } = makeSut()
    jest.spyOn(httpInputValidatorMock, 'execute').mockImplementationOnce(() => validationErrorResult)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationErrorResult))
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
