import { MongoMemoryServer } from 'mongodb-memory-server'
import MongoHelper from './mongo-helper'

let mongoServer: MongoMemoryServer

export class MongoMemoryHelper {
  static async connect(): Promise<void> {
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()
    await MongoHelper.connect(uri)
  }

  static async disconnect(): Promise<void> {
    await MongoHelper.disconnect()
    mongoServer.stop()
  }
}
