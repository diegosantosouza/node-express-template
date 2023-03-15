import mongoose, { Model, Mongoose, QueryOptions } from 'mongoose'

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

  static async paginate(schema: Model<any>, params: QueryOptions) {
    const { page = 1, limit = 100, where, orderBy } = params

    const pipeline = [
      { $match: where },
      { $sort: orderBy },
      { $skip: (page - 1) * limit },
      { $limit: limit },
      {
        $facet: {
          items: [{ $project: schema }],
          pageInfo: [
            { $count: 'totalItems' },
            {
              $project: {
                totalItems: { $sum: 1 },
                totalPages: { $ceil: { $divide: ['$totalItems', limit] } },
              },
            },
          ],
        },
      },
    ]

    const [result] = await schema.aggregate(pipeline).exec()
    const { items, pageInfo } = result

    return {
      items,
      page,
      limit,
      totalItems: pageInfo[0].totalItems,
      totalPages: pageInfo[0].totalPages,
      hasNextPage: pageInfo[0].totalPages > page,
      hasPrevPage: page > 1,
    }
  }

  static getConnectionState(): number {
    return mongoose.connection.readyState
  }

  static toObjectId(id: string): mongoose.Types.ObjectId {
    const objectId = new mongoose.Types.ObjectId(id);
    return objectId
  }
}
