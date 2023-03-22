import { Express, Router } from 'express'
import healthcheckRouter from '../routes/healthcheck-route'
import userRouter from '../routes/user-route'

export default (app: Express): void => {
  const router = Router()
  app.use('/', router)
  router.use(healthcheckRouter)
  router.use(userRouter)
}
