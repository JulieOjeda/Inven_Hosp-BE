export interface IBaseRepository<T> {
    create(data: T): Promise<T>;
    findById(id: string): Promise<T | null>;
    findAll(): Promise<T[]>;
    update(data: T): Promise<void | null>;
}
  
export abstract class BaseRepository<T> implements IBaseRepository<T> {
    abstract create(data: T): Promise<T>;
    abstract findById(id: string): Promise<T | null>;
    abstract findAll(): Promise<T[]>;
    abstract update(data: T): Promise<void | null>;
}
