export interface Pagination {
  take: number;
  skip: number;
}

export interface BaseRepository<T> {
  create(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<T>;
  findAll(props?: Pagination): Promise<T[]>;
}
