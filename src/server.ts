import * as dotenv from 'dotenv'
dotenv.config()
import { setupApp } from '@/main/config/app'
import MongoHelper from '@/infrastructure/db/mongodb/mongo-helper'

const port = process.env.PORT || 3000

async function startServer() {
  try {
    await MongoHelper.connect()
    const app = await setupApp()
    app.listen(port, () => {
      console.info(`Server initialized on port: ${port}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
  }
}

startServer()
