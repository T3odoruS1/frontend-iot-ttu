import {
	Control,
	FieldErrors,
	UseFormGetValues,
	UseFormRegister,
	UseFormSetValue,
	useFieldArray,
} from "react-hook-form";
import { Col, FormFloating, FormLabel, FormSelect, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { INewsOutputDTO } from "../../../../dto/news/INewsOutputDTO";
import { ITopicAreaWithChildren } from "../../../../dto/topicarea/ITopicAreaWithChildren";
import { TopicAreaService } from "../../../../services/TopicAreaService";
import ButtonSmaller from "../../../../components/common/ButtonSmaller";
import useTranslatedTopicAreas from "../../../../hooks/useTranslatedTopicAreas";
import useTopicAreas from "../../../../hooks/useTopicAreas";
import TopicAreaCreatePopup from "../topicareas/TopicAreaCreatePopup";

interface IProps {
	control: Control<INewsOutputDTO, any>;
	setValue: UseFormSetValue<INewsOutputDTO>;
	register: UseFormRegister<INewsOutputDTO>;
	errors: FieldErrors<INewsOutputDTO>;
}

const NewsTopicAreaInput: React.FC<IProps> = ({
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
													<>
														<option
															id={topicArea.id}
															value={topicArea.id}
															key={topicArea.id}>
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
									<ButtonSmaller className="m-2" type="button">
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

export default NewsTopicAreaInput;
