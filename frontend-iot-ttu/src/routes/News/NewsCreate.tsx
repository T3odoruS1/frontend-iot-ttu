import { FieldValues } from "react-hook-form";
import NewsCreateForm from "./NewsCreateFormWithPreview";
import { NewsService } from "../../services/NewsService";
import i18n from "i18next";
import { INewsOutputDTO } from "../../DTO/News/INewsOutputDTO";

const NewsCreate = () => {
    const newsService = new NewsService();

    const onSubmit = async (formValues: FieldValues) => {
      console.log(formValues)
      let newsOutput: INewsOutputDTO = {
        title: [
          {
            value: "Title value in eng",
            culture: "en"
          },
          {
            value: "Title value in est",
            culture: "et"
          }
        ],
        body: [
          {
            value: "Body in eng",
            culture: "en"
          },
          {
            value:  "Body in est",
            culture: "et"
          }
        ],
        image: formValues.file,
        author: "Mingi Mees",
        topicAreas: [{id: "f88c04d2-b664-4e24-bc76-0f786094e840"}]
      }
      const result = await newsService.post(`/${i18n.language}/news/create`, newsOutput);
      console.log(result);
      
    }

  return <>
        <NewsCreateForm onSubmit={onSubmit}/>
  </>
}

export default NewsCreate;