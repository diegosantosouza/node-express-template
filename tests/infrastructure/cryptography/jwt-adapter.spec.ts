import { JwtAdapter } from '@/infrastructure/cryptography'
import { throwError } from '@/tests/domain/mocks/throw-error-helper'

import * as jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
  async sign(): Promise<string> {
    return 'any_token'
  },

  async verify(): Promise<string> {
    return 'any_value'
  }
}))
const expirationTime = '1d'

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('secret', expirationTime)
}

const encryptPayload = {
  id: 'any_id'
}

describe('Jwt Adapter', () => {
  describe('sign()', () => {
    test('Should call sign with correct values', async () => {
      const sut = makeSut()
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt(encryptPayload)
      expect(signSpy).toHaveBeenCalledWith(encryptPayload, 'secret', { expiresIn: expirationTime })
    })

    test('Should return a token on sign success', async () => {
      const sut = makeSut()
      const accessToken = await sut.encrypt(encryptPayload)
      expect(accessToken).toBe('any_token')
    })

    test('Should throw if sign throws', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(throwError)
      const promise = sut.encrypt(encryptPayload)
      await expect(promise).rejects.toThrow()
    })
  })

  describe('verify()', () => {
    test('Should call verify with correct values', async () => {
      const sut = makeSut()
      const verifySpy = jest.spyOn(jwt, 'verify')
      await sut.decrypt('any_token')
      expect(verifySpy).toHaveBeenCalledWith('any_token', 'secret')
    })

    // test('Should return a value on verify success', async () => {
    //   const sut = makeSut()
    //   const value = await sut.decrypt('any_token')
    //   expect(value).toBe('any_value')
    // })

    test('Should throw if verify throws', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'verify').mockImplementationOnce(throwError)
      const promise = sut.decrypt('any_token')
      await expect(promise).rejects.toThrow()
    })
  })

})
