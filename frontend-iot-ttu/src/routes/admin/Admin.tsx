import {Outlet} from "react-router-dom";
import AdminHeader from "../../components/header/admin/AdminHeader";
import Footer from "../../components/Footer";
import {Loader} from "../../components/Loader";
import React from "react";

const Admin = () => {
    return (
        <>
            <AdminHeader/>
            <main>
                <div className="root-div">
                    <React.Suspense fallback={<Loader/>}>
                        <Outlet/>
                    </React.Suspense>
                </div>
            </main>
            <Footer/>

        </>
    );
};

export default Admin;
