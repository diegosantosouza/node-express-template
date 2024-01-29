import { CreateUserRepositorySpy } from "@/tests/data/usecases/user/mocks/mock-db-user";
import { Gender, Roles } from "@/domain/models/user";
import { UserCreateController } from "@/presentation/controllers/user/user-create.controller";
import { faker } from "@faker-js/faker";
import { throwError } from "@/tests/domain/mocks/throw-error-helper";
import { badRequest, response, serverError } from "@/presentation/helpers";
import { ServerError } from "@/presentation/errors";
import { ZodAdapter } from "@/infrastructure/validator/zod-adapter";
import { HttpInputValidator } from "@/presentation/validation/http-input-validator";
import { UserCreateSchema } from "@/infrastructure/validator/schemas/user-validation-schema";

jest.mock('@/presentation/validation/http-input-validator');

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



const validationErrorResult =
  [
    {
      code: "invalid_type",
      expected: "string",
      received: "undefined",
      path: [
        "body",
        "firstName",
      ],
      message: "Required",
    },
  ]


type SutTypes = {
  sut: UserCreateController
  dbUserCreateSpy: CreateUserRepositorySpy
  httpInputValidatorMock: HttpInputValidator
  validatorMock: ZodAdapter
}

const makeSut = (): SutTypes => {
  const validatorMock = new ZodAdapter(UserCreateSchema)
  const httpInputValidatorMock = new HttpInputValidator(validatorMock)
  const dbUserCreateSpy = new CreateUserRepositorySpy()
  const sut = new UserCreateController(dbUserCreateSpy, httpInputValidatorMock)
  return {
    sut,
    dbUserCreateSpy,
    httpInputValidatorMock,
    validatorMock
  }
}

describe("UserCreateController", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

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

  test('Should return 400 if incorrect payload', async () => {
    const { sut, httpInputValidatorMock } = makeSut()
    jest.spyOn(httpInputValidatorMock, 'execute').mockImplementationOnce(() => validationErrorResult)
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpInputValidatorMock.execute).toHaveBeenCalled()
    expect(httpResponse).toEqual(badRequest(validationErrorResult))
  })
})
