import {IContent} from "../../IContent";

export interface IContactPersonOutput{
    id?: string | null | undefined,
    name: string,
    body: IContent[]
}