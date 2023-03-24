import { PaginateOptions } from '@/domain/usecases/paginate/paginate-options'
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
}

