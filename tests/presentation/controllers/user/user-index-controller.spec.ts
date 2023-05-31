import { IndexUserRepositorySpy } from "@/tests/data/usecases/user/mocks/mock-db-user";
import { UserIndexController } from "@/presentation/controllers/user/user-index.controller";
import { faker } from "@faker-js/faker";
import { throwError } from "@/tests/domain/mocks/throw-error-helper";
import { ok, serverError } from "@/presentation/helpers";
import { ServerError } from "@/presentation/errors";
import { Gender, Roles } from "@/domain/models/user";

const mockRequest = (): UserIndexController.Request => {
  return {
    query: {
      page: 1,
      limit: 10,
      email: faker.internet.email(),
      roles: Roles.USER,
      gender: Gender.MALE,
    }
  }
}

type SutTypes = {
  sut: UserIndexController
  dbUserIndexSpy: IndexUserRepositorySpy
}

const makeSut = (): SutTypes => {
  const dbUserIndexSpy = new IndexUserRepositorySpy()
  const sut = new UserIndexController(dbUserIndexSpy)
  return {
    sut,
    dbUserIndexSpy
  }
}

describe("UserIndexController", () => {
  test('Should call userIndex with correct values', async () => {
    const { sut, dbUserIndexSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(dbUserIndexSpy.params).toEqual({
      where: {
        email: { $in: request.query.email },
        gender: { $in: request.query.gender },
        roles: { $in: request.query.roles },
      },
      page: request.query.page,
      limit: request.query.limit,
    })
  })

  test('Should return 500 if userShow throws', async () => {
    const { sut, dbUserIndexSpy } = makeSut()
    jest.spyOn(dbUserIndexSpy, 'index').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError('')))
  })

  test('Should return 200 if success', async () => {
    const { sut, dbUserIndexSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(dbUserIndexSpy.result))
  })
})
