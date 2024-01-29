export interface DatabaseRepository<T> {
  create(data: unknown): Promise<T>;
  findById(id: string | number): Promise<T | null>;
  update(id: string | number, data: Partial<T>): Promise<T | null>;
  delete(id: string | number): Promise<boolean>;
  find(query: unknown): Promise<T[] | null>; 
}
