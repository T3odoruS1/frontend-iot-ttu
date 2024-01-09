import {FieldValues} from "react-hook-form";
import * as yup from "yup";

interface IProps {
    onSubmit: (event: FieldValues) => void;
}

const schema = yup.object().shape({
    year: yup.number().min(1).max(3000).required(),
    projectManager: yup.string().required()
})

const CreateProjectFormWithPreview = () => {
    return (
        <></>
    );
};

export default CreateProjectFormWithPreview;