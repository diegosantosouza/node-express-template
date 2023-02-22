import { Router } from 'express'
import HealthcheckController from './healthcheck.controller'

const healthcheckRouter = Router()

healthcheckRouter.get('/healthcheck', HealthcheckController.show)

export default healthcheckRouter
