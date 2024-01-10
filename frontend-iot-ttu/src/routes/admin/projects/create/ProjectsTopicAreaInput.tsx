import {
	Control,
	FieldErrors,
	UseFormRegister,
	UseFormSetValue,
	useFieldArray,
} from "react-hook-form";
import { Col, FormFloating, FormLabel, FormSelect, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { INewsOutputDTO } from "../../../../dto/news/INewsOutputDTO";
import ButtonSmaller from "../../../../components/common/ButtonSmaller";
import useTopicAreas from "../../../../hooks/useTopicAreas";
import {IProjectOutput} from "../../../../dto/project/IProjectOutput";
import React, {Fragment} from "react";

interface IProps {
	control: Control<IProjectOutput, any>;
	setValue: UseFormSetValue<IProjectOutput>;
	register: UseFormRegister<IProjectOutput>;
	errors: FieldErrors<IProjectOutput>;
}

const ProjectsTopicAreaInput: React.FC<IProps> = ({
	control,
	setValue,
	register,
	errors,
}) => {
	const { fields, remove, append } = useFieldArray({
		control: control,
		name: "topicAreas",
	});
	const { t } = useTranslation();
	
	const {topicAreas} = useTopicAreas();

	return (
		<>
			<div>
				{fields.map((item, index) => {
					return (
						<section className="m-2" key={index}>
							<Row>
								<Col md="9">
									<FormFloating>
										<FormSelect
											aria-label="Choose topic area"
											{...register(`topicAreas.${index}.id`)}
											id={`topicAreas.${index}.id`}
											name={`topicAreas.${index}.id`}>
												<option value="">{t('admin.news.adminNews.create.chooseTopicArea')}</option>
											{topicAreas.map((topicArea) => {
												return (
													<Fragment key={topicArea.id}>
														<option id={topicArea.id} value={topicArea.id}>
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
													</Fragment>
												);
											})}
										</FormSelect>
										<FormLabel htmlFor={`topicAreas.${index}.id`}>
											{t("admin.news.adminNews.create.chooseTopicArea")}
											<span className="text-danger">
												{/*{errors.topicAreas?.[index]?.id?.message?.toString()}*/}
											</span>
										</FormLabel>
									</FormFloating>
								</Col>
								<Col md="2">
								{/*<TopicAreaCreatePopup topicAreas={topicAreasTranslated}/>*/}

								</Col>
								<Col md="1">
									<ButtonSmaller onClick={() => {
										remove(index)
									}} className="m-2" type="button">
										-
									</ButtonSmaller>
								</Col>
							</Row>
						</section>
					);
				})}
				<ButtonSmaller
					type="button"
					className="mt-2"
					onClick={() => {
						console.log(errors.topicAreas?.[0]?.message?.toString());

						append({
							id: "",
						});
					}}>
					{t("admin.news.adminNews.create.addTopicArea")}
				</ButtonSmaller>
			</div>
		</>
	);
};

export default ProjectsTopicAreaInput;
