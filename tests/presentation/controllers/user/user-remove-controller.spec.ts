import { validIdRule } from '@/infrastructure/validator/schemas/id-validation-schema';
import { RemoveUserRepositorySpy } from "@/tests/data/usecases/user/mocks/mock-db-user";
import { UserRemoveController } from "@/presentation/controllers/user/user-remove.controller";
import { throwError } from "@/tests/domain/mocks/throw-error-helper";
import { badRequest, noContent, serverError } from "@/presentation/helpers";
import { ServerError } from "@/presentation/errors";
import { ZodAdapter } from '@/infrastructure/validator/zod-adapter';
import { HttpInputValidator } from '@/presentation/validation/http-input-validator';

const mockRequest = (): UserRemoveController.Request => {
  return {
    params: {
      id: "647654181d2f0d23d9865081",
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
  sut: UserRemoveController
  dbUserRemoveSpy: RemoveUserRepositorySpy
  httpInputValidatorMock: HttpInputValidator
  validatorMock: ZodAdapter
}

const makeSut = (): SutTypes => {
  const validatorMock = new ZodAdapter(validIdRule)
  const httpInputValidatorMock = new HttpInputValidator(validatorMock)
  const dbUserRemoveSpy = new RemoveUserRepositorySpy()
  const sut = new UserRemoveController(dbUserRemoveSpy, httpInputValidatorMock)
  return {
    sut,
    dbUserRemoveSpy,
    validatorMock,
    httpInputValidatorMock
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

  test('Should return 400 if incorrect id param', async () => {
    const { sut, httpInputValidatorMock } = makeSut()
    jest.spyOn(httpInputValidatorMock, 'execute').mockImplementationOnce(() => validationErrorResult)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpInputValidatorMock.execute).toHaveBeenCalled()
    expect(httpResponse).toEqual(badRequest(validationErrorResult))
  })

  test('Should return 200 if success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
