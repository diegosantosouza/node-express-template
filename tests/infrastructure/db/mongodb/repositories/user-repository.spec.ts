import { MongoMemoryHelper } from '@/infrastructure/db/mongodb/mongo-memory-server-helper';
import { UserRepository } from '@/infrastructure/db/mongodb/repositories/user-repository';
import { UserSchema } from '@/infrastructure/db/mongodb/schemas/user';
import { mockCreateUserParams, mockUpdateUserParams } from '@/tests/domain/mocks/user/mock-user';

const makeSut = (): UserRepository => {
  return new UserRepository()
}

const createUsers = async (quantity: number) => {
  for (let i = 0; i < quantity; i++) {
    const sut = makeSut()
    const createUserParams = mockCreateUserParams()
    await sut.create(createUserParams)
  }
}
describe('UserRepository', () => {
  beforeAll(async () => {
    await MongoMemoryHelper.connect()
  })

  afterAll(async () => {
    await MongoMemoryHelper.disconnect()
  })

  beforeEach(async () => {
    await UserSchema.deleteMany({})
  })

  describe('create()', () => {
    test('Should return an account on success', async () => {
      const sut = makeSut()
      const createUserParams = mockCreateUserParams()
      const userCreated = await sut.create(createUserParams)
      expect(userCreated).toHaveProperty('id')
    })
  })

  describe('delete()', () => {
    test('Should return true on success', async () => {
      const sut = makeSut()
      const createUserParams = mockCreateUserParams()
      const userCreated = await sut.create(createUserParams)
      const deleted = await sut.delete(userCreated.id)
      expect(deleted).toBeTruthy()
    })

    test('Should return throw if id not found or invalid', async () => {
      const sut = makeSut()
      const invalidId = 'invalid_id'
      await expect(sut.delete(invalidId)).rejects.toThrow()
    })
  })

  describe('show()', () => {
    test('Should return user if user.id exists', async () => {
      const sut = makeSut()
      const createUserParams = mockCreateUserParams()
      const userCreated = await sut.create(createUserParams)
      const user = await sut.show(userCreated.id)
      expect(user).toEqual({
        id: userCreated.id,
        firstName: userCreated.firstName,
        lastName: userCreated.lastName,
        birthDate: userCreated.birthDate,
        email: userCreated.email,
        roles: userCreated.roles,
        gender: userCreated.gender,
        createdAt: userCreated.createdAt,
        updatedAt: userCreated.updatedAt
      })
    })

    test('Should return null if user not exists', async () => {
      const sut = makeSut()
      const invalidId = '64110b8aac0f15e67d9a7b05'
      const user = await sut.show(invalidId)
      expect(user).toBeNull()
    })
  })

  describe('update()', () => {
    test('Should update user on success', async () => {
      const sut = makeSut()
      const createUserParams = mockCreateUserParams()
      const updateUserParams = mockUpdateUserParams()
      const userCreated = await sut.create(createUserParams)
      const updatedUser = await sut.update({ id: userCreated.id, data: updateUserParams.data })
      expect(updatedUser).toEqual({
        id: userCreated.id,
        firstName: userCreated.firstName,
        lastName: userCreated.lastName,
        birthDate: userCreated.birthDate,
        email: userCreated.email,
        roles: updateUserParams.data.roles,
        gender: updateUserParams.data.gender,
        createdAt: userCreated.createdAt,
        updatedAt: updatedUser?.updatedAt
      })
    })

    test('Should return null if user not exists', async () => {
      const sut = makeSut()
      const invalidId = '64110b8aac0f15e67d9a7b05'
      const updateUserParams = mockUpdateUserParams()
      const updatedUser = await sut.update({ id: invalidId, data: updateUserParams.data })
      expect(updatedUser).toBeNull()
    })
  })

  describe('index()', () => {
    test('Should return array of users in data type', async () => {
      const sut = makeSut()
      await createUsers(10)
      const indexUsers = await sut.index()
      expect(indexUsers.items).toHaveLength(10)
    })

    test('Should return an an array with only 5 records', async () => {
      const sut = makeSut()
      await createUsers(10)
      const params = { limit: 5 }
      const indexUsers = await sut.index(params)
      expect(indexUsers.items).toHaveLength(5)
      expect(indexUsers.totalItems).toBe(10)
      expect(indexUsers.totalPages).toBe(2)
      expect(indexUsers.hasNextPage).toBeTruthy()
    })
  })
})
