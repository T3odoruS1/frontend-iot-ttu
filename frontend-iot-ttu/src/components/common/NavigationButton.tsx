import {Link} from "react-router-dom";
import React from "react";

const NavigationButton: React.FC<{to: string, children: React.ReactNode}> = ({to, children}) => {
    return <Link style={{textDecoration: "none"}} to={to}> {"←"} {children}</Link>
}

export default NavigationButton;