import { Request, Response } from 'express'
import HealthcheckController from './healthcheck.controller'

describe('HealthcheckController', () => {
  it('should returns ok json response', () => {
    const mockRequest = { ip: 'test-host' } as Request
    const mockResponse = { json: (data) => data } as Response
    const response = HealthcheckController.show(mockRequest, mockResponse)

    expect(response).toEqual({
      status: 'OK',
      version: process.env.npm_package_version,
      host: 'test-host',
    })
  })
})
