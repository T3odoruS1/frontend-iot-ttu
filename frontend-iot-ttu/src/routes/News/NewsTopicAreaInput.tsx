import {
	Control,
	FieldErrors,
	UseFormGetValues,
	UseFormRegister,
	UseFormSetValue,
	useFieldArray,
} from "react-hook-form";
import { INewsOutput } from "../../DTO/News/INewsOutput";
import { FormFloating, FormLabel, FormSelect } from "react-bootstrap";
import { TopicAreaService } from "../../services/TopicAreaService";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ITopicAreaGet } from "../../DTO/TopicArea/ITopicAreaGet";
import i18n from "i18next";

interface IProps {
	control: Control<INewsOutput, any>;
	setValue: UseFormSetValue<INewsOutput>;
	register: UseFormRegister<INewsOutput>;
	errors: FieldErrors<INewsOutput>;
	getValues: UseFormGetValues<INewsOutput>;
}

const NewsTopicAreaInput: React.FC<IProps> = ({
	control,
	setValue,
	register,
	errors,
	getValues,
}) => {
	const { fields, remove, append } = useFieldArray({
		control: control,
		name: "topicAreas",
	});

	const topicAreaService = new TopicAreaService();
	const { t } = useTranslation();
	const [topicAreas, setTopicAreas] = useState<ITopicAreaGet[]>([]);

	const fetchTopicAreas = async () => {
		console.log("Sent request");

		const topicAreaResponse = await topicAreaService.get<ITopicAreaGet[]>(
			`${i18n.language}/topicAreas/get`
		);
		if (topicAreaResponse !== undefined) {
			setTopicAreas(topicAreaResponse);
			console.log(topicAreas.length);
		}
	};

	useEffect(() => {
		fetchTopicAreas();
	}, []);

	return (
		<>
			<div>
				{fields.map((item, index) => {
					return (
						<section className="m-2">
							<div className="row">
								<FormFloating className="col-md-9">
									<FormSelect id="topicAreas" name="topicAreas">
										<option></option>
                                        {topicAreas.map((topicArea) => {
                                            return <>aaaa</>
                                        })}
									</FormSelect>
									<FormLabel htmlFor="topicAreas">Topic areas</FormLabel>
								</FormFloating>
								<div className="col-md-2">
									<button className=" btn btn-ttu-pink m-2" type="button">
										Create category
									</button>
								</div>
								<div className="col-md-1">
									<button className="btn btn-ttu-pink m-2" type="button">
										-
									</button>
								</div>
							</div>
						</section>
					);
				})}
				<button
					type="button"
					className="mt-2 btn btn-ttu-pink"
					onClick={() => {
						append({
							id: "",
						});
					}}>
					Add category
				</button>
			</div>
		</>
	);
};

export default NewsTopicAreaInput;
