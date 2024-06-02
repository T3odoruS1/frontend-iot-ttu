import {Outlet} from "react-router-dom";
import AdminHeader from "../../components/header/admin/AdminHeader";
import Footer from "../../components/Footer";
import {Loader} from "../../components/Loader";
import React from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import {useTranslation} from "react-i18next";
import {CheckLogin} from "./CheckLogin";

const Admin = () => {
    const {t} = useTranslation();
    useDocumentTitle(t("titles.admin"))
    return (
        <>
            <AdminHeader/>
            <CheckLogin>
                <main>
                    <div className="root-div">
                        <React.Suspense fallback={<Loader/>}>
                            <Outlet/>
                        </React.Suspense>
                    </div>
                </main>
            </CheckLogin>
            <Footer/>

        </>
    );
};

export default Admin;
