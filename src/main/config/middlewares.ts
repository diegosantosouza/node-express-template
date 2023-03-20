import { bodyParser, apiVersion, errorHandler, xPoweredBy, cors, morganFormat, contentType } from '@/main/middlewares'

import { Express } from 'express'
import helmet from 'helmet'
import morgan = require('morgan')

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(apiVersion)
  app.use(errorHandler)
  app.use(cors)
  app.use(contentType)
  app.use(xPoweredBy)
  app.use(morgan(morganFormat))
  app.use(helmet())
}
