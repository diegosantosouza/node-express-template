import { UpdateUserRepositorySpy } from "@/tests/data/usecases/user/mocks/mock-db-user";
import { UserUpdateController } from "@/presentation/controllers/user/user-update.controller";
import { faker } from "@faker-js/faker";
import { throwError } from "@/tests/domain/mocks/throw-error-helper";
import { notFound, ok, serverError } from "@/presentation/helpers";
import { ServerError } from "@/presentation/errors";

const mockRequest = (): UserUpdateController.Request => {
  return {
    params: {
      id: faker.datatype.uuid(),
    },
    body: {
      firstName: faker.name.firstName(),
    }
  }
}

type SutTypes = {
  sut: UserUpdateController
  dbUserUpdateSpy: UpdateUserRepositorySpy
}

const makeSut = (): SutTypes => {
  const dbUserUpdateSpy = new UpdateUserRepositorySpy()
  const sut = new UserUpdateController(dbUserUpdateSpy)
  return {
    sut,
    dbUserUpdateSpy
  }
}

describe("UserUpdateController", () => {
  test('Should call userUpdate with correct values', async () => {
    const { sut, dbUserUpdateSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(dbUserUpdateSpy.params).toEqual({
      id: request.params.id,
      data: request.body
    })
  })

  test('Should return 404 if userId not found', async () => {
    const { sut, dbUserUpdateSpy } = makeSut()
    jest.spyOn(dbUserUpdateSpy, 'update').mockImplementationOnce(async () => null)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(notFound())
  })

  test('Should return 500 if userUpdate throws', async () => {
    const { sut, dbUserUpdateSpy } = makeSut()
    jest.spyOn(dbUserUpdateSpy, 'update').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError('')))
  })

  test('Should return 200 if update success', async () => {
    const { sut, dbUserUpdateSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(dbUserUpdateSpy.result))
  })
})
