import { Request, Response } from 'express'

class HealthcheckController {
  public static show(request: Request, response: Response): Response {
    return response.json({
      status: 'OK',
      version: process.env.npm_package_version,
      host: request.ip,
    })
  }
}

export default HealthcheckController
