import { NextFunction, Request, Response } from 'express'

const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  next: NextFunction,
): Response => {
  return response.status(500).json('Server error')
}

export default errorHandler
