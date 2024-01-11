import IBaseProps from "../IBaseProps";

export enum TitleColors{
    pink = "#e4067e",
    purple = "#342b60"
}

interface IProps extends IBaseProps{
    color?: TitleColors
}

export const TitleAllCaps: React.FC<IProps> = ({ children, className, color }) => {
    return (
        <>
                <h1
                    className={className || ""}
                    style={{
                        color: color ?? TitleColors.pink,
                        fontWeight: 500,
                        fontSize: "2.5rem",
                        fontFamily: "ThickTTU sans-serif",
                        textTransform: "uppercase",
                        lineHeight: "2.5rem",
                    }}>
                    {children}
                </h1>
            </>
    );
};