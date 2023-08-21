export interface INewsOutput{
    titleEng: string,
    titleEst: string, 
    file: string,
    contentEng: string,
    contentEst: string
    topicAreas: {id: string}[],
    author: string,
}