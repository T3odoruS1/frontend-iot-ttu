import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import ErrorPage from './routes/ErrorPage';
import Root from './routes/Root';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import NewsListPage from './routes/News/NewsListPage';
import NewsDetailsPage from './routes/News/NewsDetailsPage';
import NewsCreatePage from './routes/News/NewsCreatePage';
import { initReactI18next } from 'react-i18next';
import i18n from "i18next";


i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      eng: {
        translation:{
          fileIsTooBig: "File is too large. Maximum size is {{size}} MB.",
          clickToUploadFile: "Click to upload file",
          chooseFile:"Choose file",
          header: {
            "Welcome to React": "Welcome to React",
            home: "Home",
            news: "News",
            technology: "Technology",
            projects: "Projects",
            openSourceSolutions: "Open source solutions",
            contactUs: "Contact us"
          },
          createNews:{
            createNewPost: "Create new post",
            titleInEnglish: "Title in English",
            titleInEstonian: "Title in Estonian",
            uploadPoster: "Upload a poster",
            contentEng: "Main content in English",
            contentEst: "Main content in Estonian",
            create: "Create"
          }
        }
       
      },
      est: {
        translation:{
          fileIsTooBig: "Faili suurus on liiga suur. Maksimum suurus on {{size}} MB.",
          clickToUploadFile: "Vajuta faili lisamiseks",
          chooseFile:"Vali file",
          header: {
            "Welcome to React": "Tere tulemast",
            home: "Koduleht",
            news: "Uudised",
            technology: "Tehnoloogia",
            projects: "Projektid",
            openSourceSolutions: "Vabavaralised lahendused",
            contactUs: "Võta ühendust"
          },
          createNews:{
            createNewPost: "Uus postitus",
            titleInEnglish: "Pealkiri inglise keeles",
            titleInEstonian: "Pealkiri eesti keeles",
            uploadPoster: "Pilt",
            contentEng: "Postituse sisu inglise keeles",
            contentEst: "Postituse sisu eesti keeles",
            create: "Salvesta"
          }
        }
      },
    },
    lng: "eng", 
    fallbackLng: "eng",
    interpolation: {
      escapeValue: false
    }
  });

  
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/est" />,
    },
    {
      path: "/:lang",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "news",
          element: <NewsListPage />,
        },
        {
          path: "news/:id",
          element: <NewsDetailsPage />,
        },
        {
          path: "addNews",
          element: <NewsCreatePage />,
        },
      ],
    },
  ]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
		<RouterProvider router={router} />
  </React.StrictMode>
);