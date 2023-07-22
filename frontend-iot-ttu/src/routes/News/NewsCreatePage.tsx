import { FieldValues } from "react-hook-form";
import NewsCreateForm from "./NewsCreateFormWithPreview";
import { INewsOutputDTO } from "../../DTO/INewsOutputDTO";
import { NewsService } from "../../services/NewsService";
import i18n from "i18next";

const NewsCreatePage = () => {
    const newsService = new NewsService();

    const onSubmit = async (formValues: FieldValues) => {
      console.log(formValues)
      let newsOutput: INewsOutputDTO = {
        title: [
          {
            value: formValues.titleEng,
            culture: "eng"
          },
          {
            value: formValues.titleEst,
            culture: "est"
          }
        ],
        body: [
          {
            value: formValues.contentEng,
            culture: "eng"
          },
          {
            value: formValues.contentEst,
            culture: "est"
          }
        ]
      }
      const result = await newsService.post(`/${i18n.language}/news/create`, newsOutput);
      console.log(result);
      
    }

  return <>
    <div>
        <NewsCreateForm onSubmit={onSubmit}/>
        <hr />
    </div>
  </>
}

export default NewsCreatePage;