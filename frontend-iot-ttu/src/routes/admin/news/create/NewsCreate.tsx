import {FieldValues} from "react-hook-form";
import NewsCreateForm from "./NewsCreateFormWithPreview";
import {INewsOutputDTO} from "../../../../dto/news/INewsOutputDTO";
import {NewsService} from "../../../../services/NewsService";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {SuccessAlert} from "../../../../components/lottie/SuccessAlert";


const NewsCreate = () => {
    const newsService = new NewsService();
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);

    const onSubmit = async (formValues: FieldValues) => {
        let output = formValues as INewsOutputDTO;

        if (output.id) {
            newsService.update(output).then(res => {
                setSuccess(true)
                setTimeout(() => {
                    setSuccess(false);
                    navigate(`../`);
                }, 1100)
            }).catch(() => {
                alert("Something went wrong. Try again later")
            });
        } else {
            newsService.create(formValues as INewsOutputDTO).then(res => {
                setSuccess(true)
                setTimeout(() => {
                    setSuccess(false);
                    navigate(`../`);
                }, 1100)
            }).catch(() => alert("Something went wrong. Try again later"));
        }


    }

    return <>
        {success && <SuccessAlert/> || <NewsCreateForm onSubmit={onSubmit}/>}

    </>
}

export default NewsCreate;