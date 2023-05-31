import { AuthMiddleware } from "@/presentation/middlewares";
import { LoadAccountByTokenSpy } from "../mocks/mock-account";
import { forbidden, ok, serverError } from "@/presentation/helpers";
import { AccessDeniedError } from "@/presentation/errors";
import { throwError } from "@/tests/domain/mocks/throw-error-helper";

const mockRequest = (): AuthMiddleware.Request => ({
  headers: {
    authorization: 'Bearer any_token'
  }
})

type SutTypes = {
  sut: AuthMiddleware
  loadAccountByTokenSpy: LoadAccountByTokenSpy
}

const makeSut = (role?: string): SutTypes => {
  const loadAccountByTokenSpy = new LoadAccountByTokenSpy()
  const sut = new AuthMiddleware(loadAccountByTokenSpy, role)
  return {
    sut,
    loadAccountByTokenSpy
  }
}

describe('Auth Middleware', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Should return 403 if no access-token exists in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ headers: {}})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should call LoadAccountByToken with correct accessToken', async () => {
    const role = 'any_role'
    const { sut, loadAccountByTokenSpy } = makeSut(role)
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadAccountByTokenSpy.accessToken).toBe('any_token')
    expect(loadAccountByTokenSpy.role).toBe(role)
  })

  test('Should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()
    loadAccountByTokenSpy.result = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return 200 if LoadAccountByToken returns an account', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok({
      user: {
        id: loadAccountByTokenSpy.result?.id,
        firstName: loadAccountByTokenSpy.result?.firstName,
        lastName: loadAccountByTokenSpy.result?.lastName,
        birthDate: loadAccountByTokenSpy.result?.birthDate,
        email: loadAccountByTokenSpy.result?.email,
        roles: loadAccountByTokenSpy.result?.roles,
        gender: loadAccountByTokenSpy.result?.gender,
        createdAt: loadAccountByTokenSpy.result?.createdAt,
        updatedAt: loadAccountByTokenSpy.result?.updatedAt
      }
    }))
  })

  test('Should return 500 if LoadAccountByToken throws', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()
    jest.spyOn(loadAccountByTokenSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
