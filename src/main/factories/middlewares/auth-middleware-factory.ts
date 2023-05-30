import { AuthMiddleware } from '@/presentation/middlewares'
import { Middleware } from '@/presentation/protocols/middleware'
import { makeDbLoadAccountByToken } from '../usecases/user/load-account-by-token-factory'

export const makeAuthMiddleware = (role?: string): Middleware => {
  return new AuthMiddleware(makeDbLoadAccountByToken(), role)
}
