import { FieldValues } from "react-hook-form";
import NewsCreateForm from "./NewsCreateFormWithPreview";
import i18n from "i18next";
import { INewsOutputDTO } from "../../../../dto/news/INewsOutputDTO";
import { NewsService } from "../../../../services/NewsService";
import {useNavigate, useParams} from "react-router-dom";


const NewsCreate = () => {
    const newsService = new NewsService();
    const navigate = useNavigate();

    const onSubmit = async (formValues: FieldValues) => {
      const result = await newsService.create(formValues as INewsOutputDTO);
      if(result !== undefined){
          navigate("../")
      }
    }

  return <>
        <NewsCreateForm onSubmit={onSubmit}/>
  </>
}

export default NewsCreate;