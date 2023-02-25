import HealthCheckController from '@/presentation/controllers/healthcheck/healthcheck.controller'
import { Request } from 'express'
import { ok } from '@/presentation/helpers/http-helper'

const makeSut = () => {
  const sut = new HealthCheckController()
  const mockRequest = { ip: 'test-host' } as Request
  return {
    sut,
    mockRequest,
  }
}

describe('HealthcheckController', () => {

  test('Sut should be defined', () => {
    const { sut } = makeSut()
    expect(sut).toBeDefined()
  })

  test('should returns ok json response', async () => {
    const { sut, mockRequest } = makeSut()
    const response = await sut.handle(mockRequest)
    expect(response).toEqual(ok({
      status: 'OK',
      version: process.env.npm_package_version,
      host: 'test-host',
    }))
  })
})
