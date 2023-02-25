import { Request, Response } from 'express'
import { Controller } from '@/presentation/protocols/controller'

const adaptRoute = (controller: Controller) => async (req: Request, res: Response) => {
  const httpResponse = await controller.handle(req)
  if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
    res.status(httpResponse.statusCode).json(httpResponse.body)
  } else {
    res.status(httpResponse.statusCode).json({
      error: httpResponse.body,
    })
  }
}

export default adaptRoute
