import {IBaseEntity} from "../dto/IBaseEntity";


// TEntity type should be the one that is used in getAll function.
export interface IPaginatedService<TEntity extends IBaseEntity> {
    getAll: (lang: string, page?: number, size?: number) => Promise<TEntity[]>;
    getCount: () => Promise<number>;
}