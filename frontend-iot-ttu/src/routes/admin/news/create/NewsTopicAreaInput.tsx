import {
    Control,
    FieldErrors,
    UseFormRegister,
    UseFormSetValue,
    useFieldArray, UseFormSetFocus,
} from "react-hook-form";
import {Col, FormFloating, FormLabel, FormSelect, Row} from "react-bootstrap";
import React, {Fragment, useEffect} from "react";
import {useTranslation} from "react-i18next";
import i18n from "i18next";
import {INewsOutputDTO} from "../../../../dto/news/INewsOutputDTO";
import {TopicAreaService} from "../../../../services/TopicAreaService";
import useFetch from "../../../../hooks/useFetch";
import ErrorPage from "../../../ErrorPage";
import {ITopicAreaGet} from "../../../../dto/topicarea/ITopicAreaGet";
import add from "../../../../assets/iconpack/add.svg"
import removeIcon from "../../../../assets/iconpack/remove.svg"
import Show from "../../../../components/common/Show";
import SubHeadingPurple from "../../../../components/common/SubheadingPurple";

interface IProps {
    control: Control<INewsOutputDTO, any>;
    setValue: UseFormSetValue<INewsOutputDTO>;
    register: UseFormRegister<INewsOutputDTO>;
    errors: FieldErrors<INewsOutputDTO>;
    setFocus: UseFormSetFocus<INewsOutputDTO>;

}

const NewsTopicAreaInput: React.FC<IProps> = ({
                                                  control,
                                                  setValue,
                                                  register,
                                                  errors,
                                                  setFocus
                                              }) => {
    const {fields, remove, append} = useFieldArray({
        control: control,
        name: "topicAreas",
    });
    const {t} = useTranslation();
    const service = new TopicAreaService();

    useEffect(() => {

        if (fields.length === 0) {
            append({id: ""})
        }



    }, [control]);

    const {data: topicAreas, error} = useFetch<ITopicAreaGet[]>(service.getAll, [i18n.language]);

    if (error) return <ErrorPage/>

    return (
        <>
            <div>
                <div className={"d-flex"}>
                    <h2 className={"mt-4"}>
                        {t("admin.news.adminNews.create.categories")}
                    </h2>
                    <img className={"icon-wrapper"}
                         alt={"Add"}
                         onClick={() => {
                             append({
                                 id: "",
                             });
                         }}
                         src={add}/>
                </div>

                {fields.map((item, index) => {
                    return (
                        <section className="mb-2" key={index}>
                            <Row>
                                <Col md="9">
                                    <FormFloating>
                                        <FormSelect
                                            className={errors?.topicAreas?.[index]?.id?.message ? "border border-danger no-br" : "no-br"}
                                            aria-label="Choose topic area"
                                            {...register(`topicAreas.${index}.id`)}
                                            id={`topicAreas.${index}.id`}
                                            name={`topicAreas.${index}.id`}>
                                            <option key={-1}
                                                    value="">{t('admin.news.adminNews.create.chooseTopicArea')}</option>
                                            {topicAreas?.map((topicArea) => {
                                                return (
                                                    <Fragment key={topicArea.id}>
                                                        <option id={topicArea.id} value={topicArea.id}>
                                                            {topicArea.name}
                                                        </option>
                                                    </Fragment>
                                                );
                                            })}
                                        </FormSelect>
                                        <FormLabel htmlFor={`topicAreas.${index}.id`}>
                                            {t("admin.news.adminNews.create.chooseTopicArea")}
                                            {errors?.topicAreas?.[index]?.id?.message &&
                                                <span
                                                    className="text-danger"> {t(errors?.topicAreas?.[index]?.id?.message?.toString())}</span>

                                            }
                                        </FormLabel>
                                    </FormFloating>
                                </Col>
                                <Col md="1">
                                    <Show>
                                        <Show.When isTrue={fields.length > 1}>
                                            <img className={"icon-wrapper"}
                                                 alt={"Remove"}
                                                 onClick={() => {
                                                     remove(index)
                                                 }}
                                                 src={removeIcon}/>
                                        </Show.When>
                                    </Show>
                                </Col>
                            </Row>
                        </section>
                    );
                })}
            </div>
        </>
    );
};

export default NewsTopicAreaInput;
