import {useEffect} from "react";

const DatePink: React.FC<{ date: string }> = ({date}) => {
    return (
        <span style={{
            fontSize: "1.25rem",
            color: "#e4067e",
            fontWeight: 400,
            fontFamily: "ThickTTU sans-serif",
            marginTop: "1.5rem"
        }}>{date}</span>
    );
};

export default DatePink;