import mongoose, { Mongoose } from 'mongoose'

const {
  MONGO_DEBUG,
  MONGO_URI = `${process.env.MONGO_URI}`,
} = process.env

export default class MongoHelper {
  private static connection: Mongoose | null = null

  static async connect(uri = MONGO_URI): Promise<void> {
    if (!this.connection) {
      try {
        mongoose.set('debug', MONGO_DEBUG === 'true')
        this.connection = await mongoose.connect(uri)
        console.debug('MongoDB connected successfully.')
      } catch (error) {
        console.error('MongoDB connection error: ', error)
        throw error
      }
    }
  }

  static async disconnect(): Promise<void> {
    if (this.connection) {
      try {
        await this.connection.disconnect()
        console.debug('MongoDB disconnected')
      } catch (error) {
        console.error('MongoDB disconnect error: ', error)
        throw error
      }
      this.connection = null
    }
  }

  static getConnectionState(): number {
    return mongoose.connection.readyState
  }
}
