import IBaseProps from "../IBaseProps";

export const TitlePink: React.FC<IBaseProps> = ({ children, className }) => {
    return (
        <>
                <h1
                    className={className || ""}
                    style={{
                        color: "#e4067e",
                        fontWeight: 900,
                        fontSize: "2.5rem",
                        textTransform: "uppercase",
                        lineHeight: "2.5rem",
                    }}>
                    {children}
                </h1>
            </>
    );
};