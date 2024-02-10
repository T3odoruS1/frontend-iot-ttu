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

// https://www.freecodecamp.org/news/how-to-add-drag-and-drop-in-react-with-react-beautiful-dnd/

export const AdminBannerList = () => {

    const navigate = useNavigate();
    const service = new BannerService();
    const {data: banners, error, pending, setData} = useFetch<IBanner[]>(service.getAll, [i18n.language])

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
        const [reorderedItem]= items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setData(items);

        // Send update to backend
    }

    const toCreate = () => {
        navigate("./create");
    }

    return (
        <>
            <PageTitle>Admin banner list</PageTitle>
            <p>Banners are displayed in order in which they will be displayed to the user. To reorder them simply
            drag and drop</p>
            <ButtonSmaller onClick={toCreate}>Create</ButtonSmaller>

            <DragDropContext onDragEnd={onDnD}>
                <Droppable droppableId={"banners"}>
                    {(provided) => (
                        <ul className={"banners"} {...provided.droppableProps} ref={provided.innerRef}>
                            {banners?.map((banner, index) => {
                                return (<Draggable key={banner.id} draggableId={banner.id} index={index}>
                                    {(provided) => (
                                        <li className={"banner-card"} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            <BannerComponentAdmin banner={banner}/>
                                            <ActionConfirmationAlert action={() => {
                                                remove(banner.id)
                                            }} displayText={"You sure you want to remove this contact?"}
                                                                     buttonText={"Delete"}/>
                                            <ButtonSmaller className={"h-25 m-2 mb-5"}>Update</ButtonSmaller>
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