import {
	Control,
	FieldErrors,
	UseFormGetValues,
	UseFormRegister,
	UseFormSetValue,
	useFieldArray,
} from "react-hook-form";
import { FormFloating, FormLabel, FormSelect } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { INewsOutputDTO } from "../../../../dtoo/news/INewsOutputDTO";
import { ITopicAreaWithChildren } from "../../../../dtoo/topicarea/ITopicAreaWithChildren";
import { TopicAreaService } from "../../../../services/TopicAreaService";


interface IProps {
	control: Control<INewsOutputDTO, any>;
	setValue: UseFormSetValue<INewsOutputDTO>;
	register: UseFormRegister<INewsOutputDTO>;
	errors: FieldErrors<INewsOutputDTO>;
	getValues: UseFormGetValues<INewsOutputDTO>;
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
	const [topicAreas, setTopicAreas] = useState<ITopicAreaWithChildren[]>([]);

	const fetchTopicAreas = async () => {
		console.log("Sent request");

		const topicAreaResponse = await topicAreaService.get<
			ITopicAreaWithChildren[]
		>(`${i18n.language}/topicAreas/get`);
		if (topicAreaResponse !== undefined) {
			console.log(topicAreaResponse);

			setTopicAreas(topicAreaResponse);
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
						<section className="m-2" key={index}>
							<div className="row">
								<div>
								{errors.topicAreas?.[index]?.message?.toString()}
								</div>
								<FormFloating className="col-md-9">
									<FormSelect
										{...register(`topicAreas.${index}.id`)}
										id={`topicAreas.${index}.id`}
										name={`topicAreas.${index}.id`}>
										<option key="default">Choose topic area</option>
										{topicAreas.map((topicArea) => {
											return (
												<>
													<option id={topicArea.id} value={topicArea.id} key={topicArea.id}>
														{topicArea.name}
													</option>
													{topicArea.childrenTopicAreas?.map((child) => {
														return (
															<option
																id={child.id}
																value={child.id}
																className="pl-2"
																key={child.id}>
																&nbsp;&nbsp;&nbsp;{child.name}
															</option>
														);
													})}
												</>
											);
										})}
									</FormSelect>
									<FormLabel htmlFor={`topicAreas.${index}.id`}>
										{t("createNews.chooseTopicArea")} 
									</FormLabel>
								</FormFloating>
								<div className="col-md-2">
									<button className=" btn btn-ttu-pink m-2" type="button">
										{t("createNews.createTopicArea")}
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
					{t("createNews.addTopicArea")}
				</button>
			</div>
		</>
	);
};

export default NewsTopicAreaInput;
