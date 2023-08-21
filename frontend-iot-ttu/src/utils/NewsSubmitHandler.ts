import { INewsOutputDTO } from "../dtoo/news/INewsOutputDTO";
import { NewsService } from "../services/NewsService";

class NewSubmitHandler{

    private newsService: NewsService = new NewsService();

    private submitNews = (formValues: INewsOutputDTO) : string | undefined => {
        let newsOutput: INewsOutputDTO = {
            title: formValues.title,
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
            image: formValues.image,
            author: "Mingi Mees",
            topicAreas: [{id: "f815be93-f9e0-4391-b400-95251e889f07"}]
          }
        
        return "";
    }
}

export default NewSubmitHandler;