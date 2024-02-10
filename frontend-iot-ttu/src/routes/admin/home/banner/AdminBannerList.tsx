import PageTitle from "../../../../components/common/PageTitle";
import {Button} from "react-bootstrap";
import ButtonSmaller from "../../../../components/common/ButtonSmaller";
import {useNavigate} from "react-router-dom";
import useFetch from "../../../../hooks/useFetch";
import {IBanner} from "../../../../dto/banner/IBanner";
import {BannerService} from "../../../../services/BannerService";
import i18n from "i18next";
import {BannerComponentAdmin} from "./BannerComponentAdmin";
import ActionConfirmationAlert from "../../../../components/common/ActionConfirmationAlert";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {useTranslation} from "react-i18next";
import {Loader} from "../../../../components/Loader";

// https://www.freecodecamp.org/news/how-to-add-drag-and-drop-in-react-with-react-beautiful-dnd/

const AdminBannerList = () => {

    const navigate = useNavigate();
    const service = new BannerService();
    const {data: banners, error, pending, setData} =
        useFetch<IBanner[]>(service.getAll, [i18n.language]);
    const {t} = useTranslation();

    const remove = (id: string) => {
        service.delete(id).then(() => {
            let filtered = banners!.filter(function (obj) {
                return obj.id !== id;
            });
            setData(filtered);
        })
    }

    const onDnD = (result: any) => {
        if (!result.destination) return;
        console.log(result)
        const items = Array.from(banners!)
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setData(items);

        // Send update to backend
    }

    const saveSequence = () => {
        banners?.map((b, index) => {

        })
    }

    const toCreate = () => {
        navigate("./create");
    }

    return (
        <>
            <PageTitle>{t("banners.adminTitle")}</PageTitle>
            <p>{t("banners.instructions")}</p>
            <ButtonSmaller onClick={toCreate}>{t("common.new")}</ButtonSmaller>
            {pending && <Loader/>}
            <DragDropContext onDragEnd={onDnD}>
                <Droppable droppableId={"banners"}>
                    {(provided) => (
                        <ul className={"banners p-0"} {...provided.droppableProps} ref={provided.innerRef}>
                            {banners?.map((banner, index) => {
                                return (<Draggable key={banner.id} draggableId={banner.id} index={index}>
                                    {(provided) => (
                                        <li className={"banner-card"}
                                            ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            <BannerComponentAdmin banner={banner}/>
                                            <div className={"d-flex justify-content-center"}>
                                                <div className={"m-2"}>
                                                    <ActionConfirmationAlert action={() => {
                                                        remove(banner.id)
                                                    }} displayText={t("common.deleteUSure")}
                                                                             buttonText={t('common.delete')}/>
                                                </div>
                                                <div className={"m-2"}>
                                                    <ButtonSmaller
                                                        className={"align-self-center"}>{t('common.update')}</ButtonSmaller>
                                                </div>
                                            </div>
                                        </li>
                                    )}
                                </Draggable>)
                            })}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    );
};

export default AdminBannerList;