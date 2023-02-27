import mongoose, { Collection, Connection } from 'mongoose'

class MongoHelper {
  connection: Connection | null

  constructor(private readonly uri: string) {
    this.uri = uri
    this.connection = null
  }

  async connect() {
    await mongoose.connect(this.uri,)
    this.connection = mongoose.connection
  }

  async disconnect() {
    await mongoose.disconnect()
    this.connection = null
  }

  getCollection(name: string): Collection | null {
    if (!this.connection) {
      console.error('Database not connected')
      return null
    }
    return this.connection.collection(name)
  }
}

export default MongoHelper
