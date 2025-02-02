export interface IBaseRepository<T> {
    create(data: T): Promise<T>;
    findById(id: string): Promise<T | null>;
    findAll(): Promise<T[]>;
}
  
export abstract class BaseRepository<T> implements IBaseRepository<T> {
    abstract create(data: T): Promise<T>;
    abstract findById(id: string): Promise<T | null>;
    abstract findAll(): Promise<T[]>;
}
