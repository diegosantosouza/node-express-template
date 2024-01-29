import { UpdateUserRepositorySpy } from "@/tests/data/usecases/user/mocks/mock-db-user";
import { UserUpdateController } from "@/presentation/controllers/user/user-update.controller";
import { faker } from "@faker-js/faker";
import { throwError } from "@/tests/domain/mocks/throw-error-helper";
import { badRequest, notFound, ok, serverError } from "@/presentation/helpers";
import { ServerError } from "@/presentation/errors";
import { ZodAdapter } from "@/infrastructure/validator/zod-adapter";
import { HttpInputValidator } from "@/presentation/validation/http-input-validator";
import { userUpdateSchema } from "@/infrastructure/validator/schemas/user-update-validation-schema";

const mockRequest = (): UserUpdateController.Request => {
  return {
    params: {
      id: "647654181d2f0d23d9865081",
    },
    body: {
      firstName: faker.name.firstName(),
    }
  }
}

const validationErrorResult =
  [
    {
      path: [
        "params",
        "id"
      ],
      message: "Invalid ObjectId",
      code: "custom",
      expected: "",
      received: ""
    }
  ]

type SutTypes = {
  sut: UserUpdateController
  dbUserUpdateSpy: UpdateUserRepositorySpy
  httpInputValidatorMock: HttpInputValidator
  validatorMock: ZodAdapter
}

const makeSut = (): SutTypes => {
  const validatorMock = new ZodAdapter(userUpdateSchema)
  const httpInputValidatorMock = new HttpInputValidator(validatorMock)
  const dbUserUpdateSpy = new UpdateUserRepositorySpy()
  const sut = new UserUpdateController(dbUserUpdateSpy, httpInputValidatorMock)
  return {
    sut,
    dbUserUpdateSpy,
    httpInputValidatorMock,
    validatorMock,
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

  test('Should return 400 if incorrect id param', async () => {
    const { sut, httpInputValidatorMock } = makeSut()
    jest.spyOn(httpInputValidatorMock, 'execute').mockImplementationOnce(() => validationErrorResult)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpInputValidatorMock.execute).toHaveBeenCalled()
    expect(httpResponse).toEqual(badRequest(validationErrorResult))
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
