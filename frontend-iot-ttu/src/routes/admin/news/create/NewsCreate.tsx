import { FieldValues } from "react-hook-form";
import NewsCreateForm from "./NewsCreateFormWithPreview";
import i18n from "i18next";
import { INewsOutputDTO } from "../../../../dto/news/INewsOutputDTO";
import { NewsService } from "../../../../services/NewsService";


const NewsCreate = () => {
    const newsService = new NewsService();

    const onSubmit = async (formValues: FieldValues) => {
      console.log(formValues)
      const result = await newsService.create(formValues as INewsOutputDTO);
      console.warn(result);
      
    }

  return <>
        <NewsCreateForm onSubmit={onSubmit}/>
  </>
}

export default NewsCreate;