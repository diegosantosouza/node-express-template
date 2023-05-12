import { MongoMemoryHelper } from '@/infrastructure/db/mongodb/mongo-memory-server-helper';
import { UserRepository } from '@/infrastructure/db/mongodb/repositories/user-repository';
import { UserSchema } from '@/infrastructure/db/mongodb/schemas/user';
import { setupApp } from '@/main/config/app'
import { mockCreateUserParams } from '@/tests/domain/mocks/user/mock-user';
import { Express } from 'express'
import * as request from 'supertest'

let app: Express

const makeUserRepository = (): UserRepository => {
  return new UserRepository()
}

const createUsers = async (quantity: number) => {
  for (let i = 0; i < quantity; i++) {
    const sut = makeUserRepository()
    const createUserParams = mockCreateUserParams()
    await sut.create(createUserParams)
  }
}

describe('User routes', () => {
  beforeAll(async () => {
    app = await setupApp()
    await MongoMemoryHelper.connect()
  })

  afterAll(async () => {
    await MongoMemoryHelper.disconnect()
  })

  beforeEach(async () => {
    await UserSchema.deleteMany({})
  })

  describe('POST /user', () => {
    test('Should return 201 on success', async () => {
      await request(app)
        .post('/user')
        .send({
          firstName: 'diego',
          lastName: 'souza',
          birthDate: '1992-11-07',
          email: 'diegosantos.s26@gmail.com',
          password: 'any_password',
          roles: ['USER'],
          gender: 'male',
        }).expect(201)
    })
  })

  describe('GET /user', () => {
    test('Should return 200 on success', async () => {
      await request(app)
        .get('/user')
        .expect(200)
    })
  })

  describe('PUT /user', () => {
    test('Should return 404 if id not exist', async () => {
      const invalidId = '641b12c5f99b38143875fb9e'
      await request(app)
        .put(`/user/${invalidId}`)
        .send({
          firstName: 'changed_name',
        }).expect(404)
    })

    test('Should return 200 on success', async () => {
      await createUsers(1)
      const usersRepository = makeUserRepository()
      const { items } = await usersRepository.index()
      const user = items[0]
      await request(app)
        .put(`/user/${user.id}`)
        .send({
          firstName: 'changed_name',
        }).expect(200)
    })
  })

  describe('GET /user/id', () => {
    test('Should return 404 if id not exist', async () => {
      const invalidId = '641b12c5f99b38143875fb9e'
      await request(app)
        .get(`/user/${invalidId}`)
        .expect(404)
    })

    test('Should return 200 on success', async () => {
      await createUsers(1)
      const usersRepository = makeUserRepository()
      const { items } = await usersRepository.index()
      const user = items[0]
      await request(app)
        .get(`/user/${user.id}`)
        .expect(200)
    })
  })

  describe('DELETE /user/id', () => {
    test('Should return 200 on success', async () => {
      await createUsers(1)
      const usersRepository = makeUserRepository()
      const { items } = await usersRepository.index()
      const user = items[0]
      await request(app)
        .delete(`/user/${user.id}`)
        .expect(200)
    })
  })
})
