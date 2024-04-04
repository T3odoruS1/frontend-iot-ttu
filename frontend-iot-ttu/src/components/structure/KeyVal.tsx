import {FC} from "react";

const KeyVal: FC<{ label: string, value: string, cname?: string }> = ({label, value, cname}) => {
    return (
        <div className={`${cname} d-flex`}>
            <h5 className={"proj-key pb-1 mt-1"}>
                {label}
            </h5>
            <h5 className={"proj-val mx-2"}>
                {value}
            </h5>
        </div>)
}
export default KeyVal