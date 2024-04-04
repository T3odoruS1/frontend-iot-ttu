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
import {IBannerSequenceUpdate} from "../../../../dto/banner/IBannerSequenceUpdate";
import {useState} from "react";
import {SuccessAlert} from "../../../../components/lottie/SuccessAlert";
import removeIcon from "../../../../assets/iconpack/delete.svg"
import updateIcon from "../../../../assets/iconpack/edit.svg"
import add from "../../../../assets/iconpack/add.svg"
import save from "../../../../assets/iconpack/saveChanges.svg"
import SubHeadingPurple from "../../../../components/common/SubheadingPurple";
import LayoutNoHeader from "../../../../components/structure/LayoutNoHeader";


// https://www.freecodecamp.org/news/how-to-add-drag-and-drop-in-react-with-react-beautiful-dnd/

const AdminBannerList = () => {

    const navigate = useNavigate();
    const service = new BannerService();
    const {data: banners, pending, setData, fetchData} =
        useFetch<IBanner[]>(service.getAll, [i18n.language]);
    const {t} = useTranslation();

    const [updatePending, setUpdatePending] = useState(false);
    const [success, setSuccess] = useState(false);
    const [dndUsed, setDndUsed] = useState(false);

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
        setDndUsed(true);

    }

    const saveSequence = () => {
        const data = banners?.map((b, index) => {
            const res: IBannerSequenceUpdate = {sequenceNumber: index, homePageBannerId: b.id}
            return res;
        })
        setUpdatePending(true)
        service.bulkUpdate(data!).then(r => {
            setSuccess(true);
            setDndUsed(false);
            fetchData();
            setTimeout(() => {
                setSuccess(false);
            }, 1000)
        }).catch(e => {

        }).finally(() => setUpdatePending(false))
    }

    const toCreate = () => {
        navigate("./create");
    }

    const toUpdate = (id: string) => {
        navigate(`./create/${id}`);
    }

    return (<LayoutNoHeader bodyContent={
            <>
                <div className={""}>
                    <div className={"d-flex"}>
                        <SubHeadingPurple className={"mt-2"}>{t("banners.adminTitle")}</SubHeadingPurple>
                        <img className={"icon-wrapper"}
                             alt={"Add"}
                             src={add}
                             onClick={toCreate}/>
                    </div>
                    <div>{t("banners.instructions")}</div>
                </div>
                {(pending || updatePending) && <Loader/>}
                {success && <SuccessAlert scroll={false}/>}
                <div className={""}>


                    {dndUsed && <img className={"icon-wrapper-lg"}
                                     alt={"Add"}
                                     onClick={saveSequence}
                                     src={save}/>}
                </div>
                <div className={""}>
                    <DragDropContext onDragEnd={onDnD}>
                        <Droppable droppableId={"banners"}>
                            {(provided) => (
                                <ul className={"banners unselectable p-0"} {...provided.droppableProps} ref={provided.innerRef}>
                                    {banners?.map((banner, index) => {
                                        return (<Draggable key={banner.id} draggableId={banner.id} index={index}>
                                            {(provided) => (
                                                <li className={"banner-card flex-column m-0 mb-2"}
                                                    ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    <BannerComponentAdmin banner={banner}/>
                                                    <div className={"d-flex justify-content-center"}>
                                                        <div className={"m-2"}>
                                                            <ActionConfirmationAlert action={() => {
                                                                remove(banner.id)
                                                            }} displayText={t("common.deleteUSure")}
                                                                                     triggerElement={<img className={"icon"}
                                                                                                          alt={"Delete"}
                                                                                                          src={removeIcon}/>}/>
                                                        </div>
                                                        <div className={"m-2"}>
                                                            <img className={"icon"}
                                                                 onClick={() => toUpdate(banner.id)}
                                                                 alt={"Delete"}
                                                                 src={updateIcon}/>
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
                </div>
            </>
        }/>
    );
};

export default AdminBannerList;