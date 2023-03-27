import { faker } from '@faker-js/faker';
import { PaginateResult } from "@/domain/usecases/paginate";

export const mockPaginateResult = (data: any): PaginateResult<any> => ({
  items: [data],
  page: +faker.random.numeric(),
  limit: +faker.random.numeric(),
  totalItems: +faker.random.numeric(),
  totalPages: +faker.random.numeric(),
  hasNextPage: faker.datatype.boolean(),
  hasPrevPage: faker.datatype.boolean(),
})
