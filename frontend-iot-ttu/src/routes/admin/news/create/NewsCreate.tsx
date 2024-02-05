import {FieldValues} from "react-hook-form";
import NewsCreateForm from "./NewsCreateFormWithPreview";
import {INewsOutputDTO} from "../../../../dto/news/INewsOutputDTO";
import {NewsService} from "../../../../services/NewsService";
import {useNavigate} from "react-router-dom";


const NewsCreate = () => {
    const newsService = new NewsService();
    const navigate = useNavigate();

    const onSubmit = async (formValues: FieldValues) => {
        let output = formValues as INewsOutputDTO;
        console.log(output)
        try{
            if(output.id){
                const result = await newsService.update(output);
            }else{
                const result = await newsService.create(formValues as INewsOutputDTO);
            }
            navigate("../")
        }catch (e){
            alert("Something went wrong. Try again later")
        }

    }

    return <>
        <NewsCreateForm onSubmit={onSubmit}/>
    </>
}

export default NewsCreate;