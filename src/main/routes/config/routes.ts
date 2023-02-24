import { Router } from 'express'
import healthcheckRouter from '../../../healthcheck/healthcheck.router'

const router = Router()

router.use(healthcheckRouter)

export default router
