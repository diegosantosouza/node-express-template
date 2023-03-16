export interface PaginateOptions<T> {
  where?: PaginateOptions.Where<T>
  page?: number
  limit?: number
  select?: string
  orderBy?: any
}

export namespace PaginateOptions {
  export type Where<T> = { [P in keyof T]?: any }
}
