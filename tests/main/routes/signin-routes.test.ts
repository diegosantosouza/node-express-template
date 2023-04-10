import { setupApp } from '@/main/config/app'

import { hash } from 'bcrypt'
import { Express } from 'express'
import * as request from 'supertest'
import { MongoMemoryHelper } from '@/infrastructure/db/mongodb/mongo-memory-server-helper'
import { UserSchema } from '@/infrastructure/db/mongodb/schemas/user'
import { UserRepository } from '@/infrastructure/db/mongodb/repositories/user-repository'
import { Gender, Roles } from '@/domain/models/user'

let app: Express

const makeUserRepository = (): UserRepository => {
  return new UserRepository()
}

describe('SignIn Routes', () => {
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

  describe('POST /signin', () => {
    test('Should return 200 on login', async () => {
      const usersRepository = makeUserRepository()
      const password = await hash('12345678', 12)
      await usersRepository.create({
        firstName: 'diego',
        lastName: 'souza',
        birthDate: new Date('1992-11-07'),
        email: 'diego@gmail.com',
        password,
        roles: [Roles.USER],
        gender: Gender.MALE,
      })
      await request(app)
        .post('/signin')
        .send({
          email: 'diego@gmail.com',
          password: '12345678'
        })
        .expect(200)
    })

    test('Should return 401 on login', async () => {
      await request(app)
        .post('/signin')
        .send({
          email: 'diego@gmail.com',
          password: '12345678'
        })
        .expect(401)
    })
  })
})
