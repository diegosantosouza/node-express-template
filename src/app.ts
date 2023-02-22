import * as express from 'express'
import * as morgan from 'morgan'
import helmet from 'helmet'
import * as cors from 'cors'
import routes from './routes'

import apiVersion from './common/middlewares/api-version'
import errorHandler from './common/middlewares/error-handler'

const morganFormat =
  ':remote-addr - :method :url :status :response-time ms - :res[content-length]'

class App {
  public express: express.Application

  public constructor() {
    this.express = express()

    this.middlewares()
    this.configs()
    this.errorHandlers()
  }

  private configs(): void {
    this.express.use(routes)
    this.express.disable('x-powered-by')
  }

  private middlewares(): void {
    this.express.use(express.json())
    this.express.use(helmet())
    this.express.use(
      cors({
        origin: '*',
        preflightContinue: true,
      }),
    )
    this.express.use(morgan(morganFormat))
    this.express.use(apiVersion)
  }

  private errorHandlers(): void {
    this.express.use(errorHandler)
  }
}

export default new App().express
