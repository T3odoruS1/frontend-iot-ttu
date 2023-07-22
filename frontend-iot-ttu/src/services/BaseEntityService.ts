import { IBaseEntity } from "../DTO/IBaseEntity";
import { BaseService } from "./BaseService";

export abstract class BaseEntityService<
	TEntity extends IBaseEntity
> extends BaseService {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(baseUrl: string){
        super(baseUrl);
    }
    async post(url: string, data: {}): Promise<TEntity | undefined>{
        let response = await  this.axios.post(url, data)
        return response.data;
    }
}
