import { NextFunction, Request, Response } from 'express'
import { matchedData, validationResult } from 'express-validator'

export const requestValidator = (
  request: Request,
  response: Response,
  next: NextFunction,
): Response | void => {
  const errors = validationResult(request)

  if (!errors.isEmpty()) {
    console.debug(`Invalid request payload in ${request.method} ${request.path}. Errors: `, errors.array())
    return response.status(422).json({ errors: errors.array() })
  }

  request.body = matchedData(request, { locations: ['body'] })
  return next()
}
