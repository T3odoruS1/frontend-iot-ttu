import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import ErrorPage from './routes/ErrorPage';
import Root from './routes/Root';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { initReactI18next } from 'react-i18next';
import i18n from "i18next";
import NewsCreate from './routes/News/NewsCreate';
import NewsDetails from './routes/News/NewsDetails';
import NewsList from './routes/News/NewsList';


i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
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
            author:"Author",
            authorName:"Author name",
            categories:"Categories",
            addTopicArea:"Add topic area",
            chooseTopicArea:"Choose topic area",
            createTopicArea:"Create topic area",
            contentEng: "Main content in English",
            contentEst: "Main content in Estonian",
            create: "Create"
          }
        }
       
      },
      et: {
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
            author:"Autor",
            categories:"Kategooriad",
            chooseTopicArea:"Vali kategooria",
            authorName:"Autori nimi",
            addTopicArea:"Lisa katogooria",
            createTopicArea:"Loo kategoria",
            contentEng: "Postituse sisu inglise keeles",
            contentEst: "Postituse sisu eesti keeles",
            create: "Salvesta"
          }
        }
      },
    },
    lng: "en", 
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

  
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/en" />,
    },
    {
      path: "/:lang",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "news",
          element: <NewsList />,
        },
        {
          path: "news/:id",
          element: <NewsDetails />,
        },
        {
          path: "addNews",
          element: <NewsCreate />,
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