import { HttpResponse } from '@/presentation/protocols/http'
import { ServerError, UnauthorizedError } from '@/presentation/errors'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error
})

export const notFound = (describe?: string): HttpResponse => ({
  statusCode: 404,
  body: describe || 'Not Found',
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(JSON.stringify(error.stack))
})

export const ok = (data?: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})

export const response = (statusCode: number, body?: any): HttpResponse => ({
  statusCode,
  body,
})
