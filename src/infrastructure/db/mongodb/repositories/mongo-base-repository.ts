import { PaginateOptions } from '@/domain/usecases/paginate/paginate-options'
import { Model, Document, QueryOptions, FilterQuery, UpdateQuery } from 'mongoose'

export abstract class MongoBaseRepository<T extends Document> {

  constructor(private readonly model: Model<T>) { }

  async find(entityFilterQuery: FilterQuery<T>): Promise<T[] | null> {
    return this.model.find(entityFilterQuery)
  }

  async findOne(entityFilterQuery: FilterQuery<T>, projection: Record<string, unknown>): Promise<T | null> {
    return this.model.findOne(entityFilterQuery, {
      _id: 0,
      __v: 0,
      ...projection
    }).exec()
  }
  
  async findById(id: string, options?: QueryOptions): Promise<T | null> {
    const found = await this.model.findById(id, null, options)
    return found?.toObject() ?? null
  }

  async findOneAndUpdate(entityFilterQuery: FilterQuery<T>, updateEntityData: UpdateQuery<unknown>): Promise<T | null> {
    return this.model.findOneAndUpdate(entityFilterQuery, updateEntityData, { new: true })
  }

  async exists(where: PaginateOptions.Where<T>): Promise<boolean> {
    return !!(await this.model.findOne(where));
  }

  async create(data: unknown): Promise<T> {
    const createdData = new this.model(data)
    return createdData.save() as any
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    const updatedData = await this.model.findByIdAndUpdate(id, data, {
      new: true,
    })
    return updatedData
  }

  async delete(id: string): Promise<T | null> {
    await this.model.findByIdAndDelete(id)
    return null
  }

  async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const deleteResult = await this.model.deleteMany(entityFilterQuery)
    return deleteResult.deletedCount >= 1
  }
}

