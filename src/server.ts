import * as dotenv from 'dotenv'
dotenv.config()
import { setupApp } from '@/main/config/app'
import MongoHelper from '@/infrastructure/db/mongodb/mongo-helper'
import { ExitStatus } from './main/enums/exit-status-enum'

const port = process.env.PORT || 3000

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err)
  process.exit(ExitStatus.Failure)
})

process.on('unhandledRejection', (reason, promise) => {
  console.error(`Unhandled Rejection promise: ${promise} and reason ${reason}`)
  throw reason
})

async function startServer() {
  try {
    await MongoHelper.connect()
    const app = await setupApp()
    const server = app.listen(port, () => {
      console.info(`Server initialized on port: ${port}`)
    })

    const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT']
    exitSignals.map((sig) => process.on(sig, async () => {
      try {
        server.close()
        console.info('Server exited with success')
        process.exit(ExitStatus.Success)
      } catch (error) {
        console.error('Server exited with error:', error)
        process.exit(ExitStatus.Failure)
      }
    }))
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(ExitStatus.Failure)
  }
}

startServer()
