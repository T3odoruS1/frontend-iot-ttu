import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import {RouterProvider} from "react-router-dom";
import {initReactI18next} from "react-i18next";
import i18n from "i18next";
import translations from "./i18n/translations.json"
import {router} from "./router";
import ReactGA from 'react-ga4';



interface LanguageTranslation {
    [key: string]: string;
}

interface Translations {
    [key: string]: {
        en: string;
        et: string;
        // Add more languages if needed
    } | Translations;
}

function transformTranslations(original: Translations): Record<string, LanguageTranslation> {
    const result: Record<string, LanguageTranslation> = { en: {}, et: {} }; // Extend this with more languages if needed

    function walk(obj: Translations | LanguageTranslation, path: string[] = []): void {
        Object.entries(obj).forEach(([key, value]) => {
            if (key === 'en' || key === 'et') { // Check for the language keys
                result[key][path.join('.')] = value as string; // Use dot notation for nested keys, ensure value is a string
            } else if (typeof value === 'object' && value !== null) {
                walk(value as Translations, [...path, key]); // Recurse for nested objects
            }
        });
    }

    walk(original);
    return result;
}

const transformedTranslations = transformTranslations(translations);
const en = transformedTranslations.en;
const et = transformedTranslations.et;

ReactGA.initialize("G-5ELKNXLXTV")


i18n.use(initReactI18next).init({
    resources: {en: {translation: en}, et: {translation: et}},
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
