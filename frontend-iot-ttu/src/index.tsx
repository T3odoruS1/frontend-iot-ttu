import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import {RouterProvider} from "react-router-dom";
import {initReactI18next} from "react-i18next";
import i18n from "i18next";
import et from "./i18n/et.json";
import en from "./i18n/en.json";
import {router} from "./router";

i18n.use(initReactI18next).init({
    resources: {
        en: {translation: en},
        et: {translation: et},
    },
    lng: "et",
    fallbackLng: "et",
    interpolation: {
        escapeValue: false,
    },
});


const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <RouterProvider router={router}/>
);
