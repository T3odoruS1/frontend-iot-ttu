import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import ErrorPage from './routes/ErrorPage';
import Root from './routes/Root';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import NewsDemoPage from './routes/News/NewsDemoPage';
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
      // other languages...
    },
    lng: "eng", // language to use
    fallbackLng: "eng", // use en if detected lng is not available
    interpolation: {
      escapeValue: false // react already safes from xss
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
          path: "newsDemo",
          element: <NewsDemoPage />,
        },
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