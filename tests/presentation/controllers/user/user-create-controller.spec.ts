import { CreateUserRepositorySpy } from "@/tests/data/usecases/user/mocks/mock-db-user";
import { Gender, Roles } from "@/domain/models/user";
import { UserCreateController } from "@/presentation/controllers/user/user-create.controller";
import { faker } from "@faker-js/faker";
import { throwError } from "@/tests/domain/mocks/throw-error-helper";
import { response, serverError } from "@/presentation/helpers";
import { ServerError } from "@/presentation/errors";

const mockRequest = (): UserCreateController.Request => {
  return {
    body: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: faker.internet.password(),
      birthDate: faker.date.birthdate(),
      email: faker.internet.email(),
      roles: [Roles.USER],
      gender: Gender.MALE
    }
  }
}

type SutTypes = {
  sut: UserCreateController
  dbUserCreateSpy: CreateUserRepositorySpy
}

const makeSut = (): SutTypes => {
  const dbUserCreateSpy = new CreateUserRepositorySpy()
  const sut = new UserCreateController(dbUserCreateSpy)
  return {
    sut,
    dbUserCreateSpy
  }
}

describe("UserCreateController", () => {
  test('Should call userCreate with correct values', async () => {
    const { sut, dbUserCreateSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(dbUserCreateSpy.params).toEqual({
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      password: request.body.password,
      birthDate: request.body.birthDate,
      email: request.body.email,
      roles: request.body.roles,
      gender: request.body.gender,
    })
  })

  test('Should return 500 if userCreate throws', async () => {
    const { sut, dbUserCreateSpy } = makeSut()
    jest.spyOn(dbUserCreateSpy, 'create').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError('')))
  })

  test('Should return 201 if creation success', async () => {
    const { sut, dbUserCreateSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(response(201, dbUserCreateSpy.result))
  })
})
