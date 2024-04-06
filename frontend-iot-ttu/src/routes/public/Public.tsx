import {Outlet, useLocation} from "react-router-dom";
import Header from "../../components/header/public/Header";
import Footer from "../../components/Footer";
import React, {useEffect} from "react";
import {Loader} from "../../components/Loader";
import useTrackPageNavigation from "../../hooks/useTrackPageNavigation";

const Public = () => {
    const location = useLocation();

    // useTrackPageNavigation(); // Events turned out to be useless.
    const isHomePage = () => {
        return location.pathname === "/et" || location.pathname === "/en" || location.pathname === "/et/" || location.pathname === "/en/";
    }
    return (
        <>
            <Header/>
            {isHomePage() ? (
                    <main className={"home-page-main"}>
                        <div className="root-div">
                            <React.Suspense fallback={<Loader/>}>
                                <Outlet/>
                            </React.Suspense>
                        </div>
                    </main>) :
                <main>
                    <div className="root-div">
                        <React.Suspense fallback={<Loader/>}>
                        <Outlet/>
                        </React.Suspense>
                    </div>
                </main>}

            <Footer/>
        </>
    );
};

export default Public;
