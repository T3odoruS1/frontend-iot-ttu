import {PartnerImageService} from "../../../../services/PartnerImageService";
import useFetch from "../../../../hooks/useFetch";
import {IPartnerImage} from "../../../../dto/partnerImage/IPartnerImage";
import telia from "../../../../assets/partners/Telia.png";

export const PartnerImageDisplay = () => {
    const service = new PartnerImageService();
    const {data: images, pending, error, setData} =
        useFetch<IPartnerImage[]>(service.getAll);
    return (
        <>
            {images?.map(i => {
                return <a href={i.link}><img className={"partner-image"} src={i.image} alt={"Partner image"}/></a>
            })}
        </>
    );
};