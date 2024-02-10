import Root from "./routes/Root";
import React from "react";
import {createBrowserRouter} from "react-router-dom";
import LanguageRedirect from "./components/LanguageRedirect";
import ErrorPage from "./routes/ErrorPage";
import Admin from "./routes/admin/Admin";
import Public from "./routes/public/Public";

const AdminNews = React.lazy(() => import("./routes/admin/news/AdminNews"));
const NewsCreate = React.lazy(() => import("./routes/admin/news/create/NewsCreate"));
const OpenSourceSolutionAdm = React.lazy(() => import("./routes/admin/opensourcesolutions/OpenSourceSolutionsAdm"));
const OpensourceSolutionCreatePopup = React.lazy(() => import("./routes/admin/opensourcesolutions/create/OpensourceSolutionCreatePopup"));
const ProjectsAdm = React.lazy(() => import("./routes/admin/projects/ProjectsAdm"));
const ProjectCreate = React.lazy(() => import("./routes/admin/projects/create/ProjectCreate"));
const Statistics = React.lazy(() => import("./routes/admin/statistics/Statistics"));
const TechnologiesAdm = React.lazy(() => import("./routes/admin/technology/TechnologiesAdm"));
const TechnologyCreate = React.lazy(() => import("./routes/admin/technology/create/TechnologyCreate"));
const Login = React.lazy(() => import("./routes/admin/users/login/Login"));
const Users = React.lazy(() => import("./routes/admin/users/Users"));
const UserCreate = React.lazy(() => import("./routes/admin/users/create/UserCreate"));
const Contact = React.lazy(() => import("./routes/public/contact/Contact"));
const Home = React.lazy(() => import("./routes/public/home/Home"));
const News = React.lazy(() => import("./routes/public/news/News"));
const NewsPiece = React.lazy(() => import("./routes/public/news/details/NewsPiece"));
const OpenSourceSolutions = React.lazy(() => import("./routes/public/opensourcesolutions/OpenSourceSolutions"));
const OpenSourceSolution = React.lazy(() => import("./routes/public/opensourcesolutions/details/OpenSourceSolution"));
const Projects = React.lazy(() => import("./routes/public/projects/Projects"));
const ProjectDetails = React.lazy(() => import("./routes/public/projects/details/ProjectDetails"));
const Technology = React.lazy(() => import("./routes/public/technology/details/Technology"));
const NewsList = React.lazy(() => import("./routes/public/news/list/NewsList"));
const NewsListAdm = React.lazy(() => import("./routes/admin/news/list/NewsListAdm"));
const TopicAreaForm = React.lazy(() => import("./routes/admin/news/topicareas/TopicAreaForm"));
const ProjectList = React.lazy(() => import("./routes/public/projects/list/ProjectList"));
const ProjectListAdm = React.lazy(() => import("./routes/admin/projects/list/ProjectListAdm"));
const UserList = React.lazy(() => import("./routes/admin/users/UserList"));
const NotFoundPage = React.lazy(() => import("./routes/NotFoundPage"));
const ContactPerson = React.lazy(() => import("./routes/admin/contact/ContactPerson"));
const ContactPersonList = React.lazy(() => import("./routes/admin/contact/ContactPersonList"));
const ContactPersonCreate = React.lazy(() => import("./routes/admin/contact/create/ContactPersonCreate"));
const AdminBanners = React.lazy(() => import("./routes/admin/home/banner/AdminBanners"));
const AdminBannerList = React.lazy(() => import("./routes/admin/home/banner/AdminBannerList"));
const BannerCreate = React.lazy(() => import("./routes/admin/home/banner/create/BannerCreate"));
const AdminLandingPage = React.lazy(() => import("./routes/admin/admin/AdminLandingPage"));


export const router = createBrowserRouter([
    {
        path: "",
        element: <LanguageRedirect/>,
    },
    {
        path: ":lang",
        element: <Root/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "*",
                element: <NotFoundPage/>
            },
            {
                path: "admin",
                element: <Admin/>,
                children: [
                    {
                        path: "",
                        element: <AdminLandingPage/>
                    },
                    {
                        path: "news",
                        element: <AdminNews/>,
                        children: [
                            {
                                path: "",
                                element: <NewsListAdm/>
                            },
                            {
                                path: ":id?",
                                element: <NewsPiece/>
                            },
                            {
                                path: "create/:id?",
                                element: <NewsCreate/>,
                            }, {
                                path: "topicarea",
                                element: <TopicAreaForm/>
                            },
                        ],
                    },
                    {
                        path: "banners",
                        element: <AdminBanners/>,
                        children: [
                            {
                                path: "",
                                element: <AdminBannerList/>
                            },
                            {
                                path: "create",
                                element: <BannerCreate/>
                            }
                        ]
                    },
                    {
                        path: "opensourcesolutions",
                        element: <OpenSourceSolutionAdm/>,
                        children: [
                            {
                                path: "create",
                                element: <OpensourceSolutionCreatePopup/>,
                            },
                        ],
                    },
                    {
                        path: "projects",
                        element: <ProjectsAdm/>,
                        children: [
                            {
                                path: "",
                                element: <ProjectListAdm/>,
                            },
                            {
                                path: "create/:id?",
                                element: <ProjectCreate/>,
                            },
                            {
                                path: ":id",
                                element: <ProjectDetails/>
                            }
                        ],
                    },
                    {
                        path: "statistics",
                        element: <Statistics/>,
                    },
                    {
                        path: "technology",
                        element: <TechnologiesAdm/>,
                        children: [
                            {
                                path: "create",
                                element: <TechnologyCreate/>,
                            },
                        ],
                    },
                    {
                        path: "users",
                        element: <Users/>,
                        children: [
                            {
                                path: "",
                                element: <UserList/>,
                            },
                            {
                                path: "create",
                                element: <UserCreate/>,
                            },
                            {
                                path: "login",
                                element: <Login/>,
                            },
                        ],
                    }, {
                        path: "contact",
                        element: <ContactPerson/>,
                        children: [
                            {
                                path: "",
                                element: <ContactPersonList/>
                            },
                            {
                                path: "create/:id?",
                                element: <ContactPersonCreate/>
                            }
                        ]
                    }
                ],
            },
            {
                path: "",
                element: <Public/>,
                children: [
                    {
                        path: "contact",
                        element: <Contact/>,
                    },
                    {
                        path: "",
                        element: <Home/>,
                    },
                    {
                        path: "news",
                        element: <News/>,
                        children: [
                            {
                                path: "",
                                element: <NewsList/>
                            },
                            {
                                path: ":id",
                                element: <NewsPiece/>,
                            },
                        ],
                    },
                    {
                        path: "opensourcesolutions",
                        element: <OpenSourceSolutions/>,
                        children: [
                            {
                                path: ":id",
                                element: <OpenSourceSolution/>,
                            },
                        ],
                    },
                    {
                        path: "projects",
                        element: <Projects/>,
                        children: [
                            {
                                path: "",
                                element: <ProjectList/>
                            },
                            {
                                path: ":id",
                                element: <ProjectDetails/>,
                            }

                        ],
                    },
                    {
                        path: "technology",
                        element: <Technology/>

                    },
                ],
            },
        ],
    },
], {});