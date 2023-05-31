import { RemoveUserRepositorySpy } from "@/tests/data/usecases/user/mocks/mock-db-user";
import { UserRemoveController } from "@/presentation/controllers/user/user-remove.controller";
import { faker } from "@faker-js/faker";
import { throwError } from "@/tests/domain/mocks/throw-error-helper";
import { noContent, serverError } from "@/presentation/helpers";
import { ServerError } from "@/presentation/errors";

const mockRequest = (): UserRemoveController.Request => {
  return {
    params: {
      id: faker.datatype.uuid(),
    }
  }
}

type SutTypes = {
  sut: UserRemoveController
  dbUserRemoveSpy: RemoveUserRepositorySpy
}

const makeSut = (): SutTypes => {
  const dbUserRemoveSpy = new RemoveUserRepositorySpy()
  const sut = new UserRemoveController(dbUserRemoveSpy)
  return {
    sut,
    dbUserRemoveSpy
  }
}

describe("UserRemoveController", () => {
  test('Should call userRemove with correct values', async () => {
    const { sut, dbUserRemoveSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(dbUserRemoveSpy.params).toEqual(request.params.id)
  })

  test('Should return 500 if userRemove throws', async () => {
    const { sut, dbUserRemoveSpy } = makeSut()
    jest.spyOn(dbUserRemoveSpy, 'delete').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError('')))
  })

  test('Should return 200 if success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
