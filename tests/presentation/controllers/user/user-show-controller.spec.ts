import { ShowUserRepositorySpy } from "@/tests/data/usecases/user/mocks/mock-db-user";
import { UserShowController } from "@/presentation/controllers/user/user-show.controller";
import { faker } from "@faker-js/faker";
import { throwError } from "@/tests/domain/mocks/throw-error-helper";
import { notFound, ok, serverError } from "@/presentation/helpers";
import { ServerError } from "@/presentation/errors";

const mockRequest = (): UserShowController.Request => {
  return {
    params: {
      id: faker.datatype.uuid(),
    }
  }
}

type SutTypes = {
  sut: UserShowController
  dbUserShowSpy: ShowUserRepositorySpy
}

const makeSut = (): SutTypes => {
  const dbUserShowSpy = new ShowUserRepositorySpy()
  const sut = new UserShowController(dbUserShowSpy)
  return {
    sut,
    dbUserShowSpy
  }
}

describe("UserShowController", () => {
  test('Should call userShow with correct values', async () => {
    const { sut, dbUserShowSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(dbUserShowSpy.params).toEqual(request.params.id)
  })

  test('Should return 404 if userId not found', async () => {
    const { sut, dbUserShowSpy } = makeSut()
    jest.spyOn(dbUserShowSpy, 'show').mockImplementationOnce(async () => null)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(notFound())
  })

  test('Should return 500 if userShow throws', async () => {
    const { sut, dbUserShowSpy } = makeSut()
    jest.spyOn(dbUserShowSpy, 'show').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError('')))
  })

  test('Should return 200 if success', async () => {
    const { sut, dbUserShowSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(dbUserShowSpy.result))
  })
})
