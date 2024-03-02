import {IContent} from "../IContent";

export interface IOpenSourceSolutionOutput{
    id?: string | null | undefined,
    title: IContent[]
    body: IContent[]
    link: string
    private: boolean
}