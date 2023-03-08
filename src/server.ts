import * as dotenv from 'dotenv'
dotenv.config()
import app from './app'
import MongoHelper from './infrastructure/db/mongodb/mongo-helper'

const port = process.env.PORT || 3000

async function startServer() {
  try {
    await MongoHelper.connect()

    app.listen(port, () => {
      console.info(`Server initialized on port: ${port}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
  }
}

startServer()
