import app from './app'
import MongoHelper from './infrastructure/db/mongodb/mongo-helper'

const port = process.env.PORT || 3000
const uri = process.env.MONGO_URI || 'mongodb://localhost/node-template'

try {
  new MongoHelper(uri).connect()
} catch (error) {
  console.error('unable to connect to DB. Error: ', error)
}

app.listen(port, () => console.info(`Server initialized on port: ${port}`))
