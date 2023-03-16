import { PaginateResult } from '@/domain/usecases/paginate/paginate-result'
import mongoose, { Mongoose, QueryOptions, Document } from 'mongoose'
import { IModel } from './contracts/model-paginate'

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

  static async paginate<T extends Document, U>(query: any, schema: IModel<T>, params: QueryOptions): Promise<PaginateResult<U>> {
    const { page = 1, limit = 10, lean = true, orderBy = {}, select = {} } = params
    const customLabels = { docs: 'items', totalDocs: 'totalItems' }

    const paginateOptions: mongoose.PaginateOptions = {
      page,
      limit,
      customLabels,
      lean,
      sort: orderBy,
      select
    }
    const response = await schema.paginate<U>(query, paginateOptions)
    return response
  }

  static getConnectionState(): number {
    return mongoose.connection.readyState
  }

  static toObjectId(id: string): mongoose.Types.ObjectId {
    const objectId = new mongoose.Types.ObjectId(id);
    return objectId
  }
}
