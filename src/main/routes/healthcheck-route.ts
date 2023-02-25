import { Router } from 'express'
import adaptRoute from '@/main/adapters/express-route-adapter'
import { makeHealthCheckController } from '../factories/controllers/healthcheck/healthcheck-controller-factory'

const healthcheckRouter = Router()

healthcheckRouter.get('/healthcheck', adaptRoute(makeHealthCheckController()))

export default healthcheckRouter
