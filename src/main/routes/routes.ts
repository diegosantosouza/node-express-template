import { Router } from 'express'
import healthcheckRouter from './healthcheck-route'

const router = Router()

router.use(healthcheckRouter)

export default router
