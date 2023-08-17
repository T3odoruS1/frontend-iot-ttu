import { FieldValues } from "react-hook-form";
import NewsCreateForm from "./NewsCreateFormWithPreview";
import { NewsService } from "../../services/NewsService";
import i18n from "i18next";
import { INewsOutputDTO } from "../../DTO/News/INewsOutputDTO";

const NewsCreate = () => {
    const newsService = new NewsService();

    const onSubmit = async (formValues: FieldValues) => {
      console.log(formValues)
      const result = await newsService.post(`/${i18n.language}/news/create`, formValues as INewsOutputDTO);
      console.log(result);
      
    }

  return <>
        <NewsCreateForm onSubmit={onSubmit}/>
  </>
}

export default NewsCreate;