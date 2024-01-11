import {IContent} from "../IContent";

export interface IPageContentMultilang {
    pageTitle: IContent[]; // title displayed on the page
    pageIdentifier: string; // value by which content will be found for given page.
    body: IContent[]; // html
}