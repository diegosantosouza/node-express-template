import { CreateUserRepository, ShowUserRepository, UpdateUserRepository, IndexUserRepository, RemoveUserRepository, LoadAccountByEmailRepository } from "@/data/protocols/db/user";
import { Gender, Roles } from "@/domain/models/user";
import { Authentication } from "@/domain/usecases/authentication";
import { faker } from "@faker-js/faker";

export const mockCreateUserParams = (): CreateUserRepository.Params => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  password: faker.internet.password(),
  birthDate: faker.date.birthdate(),
  email: faker.internet.email(),
  roles: [Roles.USER],
  gender: Gender.MALE
})

export const mockUserResultModel = (): CreateUserRepository.Result => ({
  id: faker.datatype.uuid(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  birthDate: faker.date.birthdate(),
  email: faker.internet.email(),
  roles: [Roles.USER],
  gender: Gender.MALE,
  createdAt: faker.date.past(),
  updatedAt: faker.date.past(),
})

export const mockUpdateUserParams = (): UpdateUserRepository.Params => ({
  id: faker.datatype.uuid(),
  data: {
    roles: [Roles.ADMIN],
    gender: Gender.FEMALE
  }
})

export const mockUpdateUserResult = (): UpdateUserRepository.Result => ({
  id: faker.datatype.uuid(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  birthDate: faker.date.birthdate(),
  email: faker.internet.email(),
  roles: [Roles.ADMIN],
  gender: Gender.FEMALE,
  createdAt: faker.date.past(),
  updatedAt: faker.date.past(),
})

export const mockShowUserParams = (): ShowUserRepository.Params => (`${faker.datatype.uuid()}`)

export const mockIndexUserParams = (): IndexUserRepository.Params => ({
  where: { gender: Gender.FEMALE },
  page: 1,
  limit: 10
})

export const mockIndexUserResult = () => (mockUserResultModel())

export const mockDeleteUserParams = (): RemoveUserRepository.Params => (`${faker.datatype.uuid()}`)

export const mockUserLoadByEmailResultModel = (): LoadAccountByEmailRepository.Result => ({
  id: faker.datatype.uuid(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  birthDate: faker.date.birthdate(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  roles: [Roles.USER],
  gender: Gender.MALE,
  createdAt: faker.date.past(),
  updatedAt: faker.date.past(),
})

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
