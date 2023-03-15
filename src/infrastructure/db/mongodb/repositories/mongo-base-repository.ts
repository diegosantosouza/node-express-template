import { PaginateOptions } from '@/domain/usecases/paginate/paginate-options'
import { PaginateResult } from '@/domain/usecases/paginate/paginate-result'
import { Model, Document, QueryOptions } from 'mongoose'

export abstract class MongoBaseRepository<T extends Document> {

  constructor(private readonly model: Model<T>) { }

  async findById(id: string, options?: QueryOptions): Promise<T | null> {
    const found = await this.model.findById(id, null, options)
    return found?.toObject() ?? null
  }

  async exists(where: PaginateOptions.Where<T>): Promise<boolean> {
    return !!(await this.model.findOne(where));
  }

  async create(data: Partial<T>): Promise<T> {
    const createdData = new this.model(data)
    return await createdData.save()
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    const updatedData = await this.model.findByIdAndUpdate(id, data, {
      new: true,
    })
    return updatedData
  }

  async delete(id: string): Promise<T | null> {
    const deletedData = await this.model.findByIdAndDelete(id)
    return deletedData
  }

  async paginate(options: PaginateOptions<T>): Promise<PaginateResult<T>> {
    const { page = 1, limit = 100, where, orderBy } = options

    const pipeline = [
      { $match: where },
      { $sort: orderBy },
      { $skip: (page - 1) * limit },
      { $limit: limit },
      {
        $facet: {
          items: [{ $project: this.model }],
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

    const [result] = await this.model.aggregate(pipeline).exec()
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
}

