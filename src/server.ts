import * as dotenv from 'dotenv'
dotenv.config()

import app from './app'
import MongoHelper from './infrastructure/db/mongodb/mongo-helper'

const port = process.env.PORT || 3000
const uri = `${process.env.MONGO_URI}`

try {
  new MongoHelper().connect(uri)
  app.listen(port, () => console.info(`Server initialized on port: ${port}`))
} catch (error) {
  console.error('unable to start', error)
}

