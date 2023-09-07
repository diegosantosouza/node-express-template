import * as dotenv from 'dotenv'
dotenv.config()
import { setupApp } from '@/main/config/app'
import MongoHelper from '@/infrastructure/db/mongodb/mongo-helper'
import { ExitStatus } from './main/enums/exit-status-enum'
import { WinstonLoggerAdapter } from './infrastructure/log/winston-adapter'

const port = process.env.PORT || 3000
const logService = new WinstonLoggerAdapter()

process.on('uncaughtException', (err) => {
  logService.error('Uncaught Exception:', err)
  process.exit(ExitStatus.Failure)
})

process.on('unhandledRejection', (reason, promise) => {
  logService.error(`Unhandled Rejection promise: ${promise} and reason ${reason}`)
  throw reason
})

async function startServer() {
  try {
    await MongoHelper.connect()
    const app = await setupApp()
    const server = app.listen(port, () => {
      logService.info(`Server initialized on port: ${port}`)
    })

    const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT']
    exitSignals.map((sig) => process.on(sig, async () => {
      try {
        server.close()
        logService.info('Server exited with success')
        process.exit(ExitStatus.Success)
      } catch (error) {
        logService.error('Server exited with error:', error)
        process.exit(ExitStatus.Failure)
      }
    }))
  } catch (error) {
    logService.error('Failed to start server:', error)
    process.exit(ExitStatus.Failure)
  }
}

startServer()
