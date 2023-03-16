import { PaginateResult } from "@/domain/usecases/paginate"
import mongoose from "mongoose"

export interface IModel<T extends mongoose.Document> extends mongoose.Model<T> {
  paginate<U>(query: any, options?: mongoose.PaginateOptions): Promise<PaginateResult<U>>
}
