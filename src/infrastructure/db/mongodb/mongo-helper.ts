import mongoose, { Collection, Connection } from 'mongoose'

class MongoHelper {
  private connection: Connection | null

  constructor() {
    this.connection = null
  }

  async connect(uri: string) {
    await mongoose.connect(uri)
    this.connection = mongoose.connection
  }

  async disconnect() {
    await mongoose.disconnect()
    this.connection = null
  }

  getCollection(name: string): Collection | null {
    if (!this.connection) {
      return null
    }
    return this.connection.collection(name)
  }
}

export default MongoHelper
