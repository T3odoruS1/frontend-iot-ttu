export interface IProjectOutput{
    year: number,
    projectManager: string,
    projectVolume: string,
    image: string, // TODO do we need this?
    body: string,
    topicAreas: [{id: string}]
}