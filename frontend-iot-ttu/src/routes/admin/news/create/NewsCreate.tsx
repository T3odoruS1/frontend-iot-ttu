import { FieldValues } from "react-hook-form";
import NewsCreateForm from "./NewsCreateFormWithPreview";
import i18n from "i18next";
import { INewsOutputDTO } from "../../../../dto/news/INewsOutputDTO";
import { NewsService } from "../../../../services/NewsService";
import {useParams} from "react-router-dom";


const NewsCreate = () => {
    const newsService = new NewsService();


    const onSubmit = async (formValues: FieldValues) => {
      await newsService.create(formValues as INewsOutputDTO);
    }

  return <>
        <NewsCreateForm onSubmit={onSubmit}/>
  </>
}

export default NewsCreate;