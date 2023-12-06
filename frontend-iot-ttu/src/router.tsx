import Root from "./routes/Root";
import { createBrowserRouter } from "react-router-dom";
import LanguageRedirect from "./components/LanguageRedirect";
import ErrorPage from "./routes/ErrorPage";
import Admin from "./routes/admin/Admin";
import AdminNews from "./routes/admin/news/AdminNews";
import NewsCreate from "./routes/admin/news/create/NewsCreate";
import OpenSourceSolutionAdm from "./routes/admin/opensourcesolutions/OpenSourceSolutionsAdm";
import OpensourceSolutionCreatePopup from "./routes/admin/opensourcesolutions/create/OpensourceSolutionCreatePopup";
import ProjectsAdm from "./routes/admin/projects/ProjectsAdm";
import ProjectCreate from "./routes/admin/projects/create/ProjectCreate";
import Statistics from "./routes/admin/statistics/Statistics";
import TechnologiesAdm from "./routes/admin/technology/TechnologiesAdm";
import TechnologyCreate from "./routes/admin/technology/create/TechnologyCreate";
import Login from "./routes/admin/users/Login";
import Users from "./routes/admin/users/Users";
import UserCreate from "./routes/admin/users/create/UserCreate";
import Public from "./routes/public/Public";
import Contact from "./routes/public/contact/Contact";
import Home from "./routes/public/home/Home";
import News from "./routes/public/news/News";
import NewsPiece from "./routes/public/news/details/NewsPiece";
import OpenSourceSolutions from "./routes/public/opensourcesolutions/OpenSourceSolutions";
import OpenSourceSolution from "./routes/public/opensourcesolutions/details/OpenSourceSolution";
import Projects from "./routes/public/projects/Projects";
import Project from "./routes/public/projects/details/Project";
import Technologies from "./routes/public/technology/Technologies";
import Technology from "./routes/public/technology/details/Technology";
import NewsList from "./routes/public/news/list/NewsList";
import NewsListAdm from "./routes/admin/news/list/NewsListAdm";
import {TopicAreaForm} from "./routes/admin/news/topicareas/TopicAreaForm";

export const router = createBrowserRouter([
	{
		path: "",
		element: <LanguageRedirect />,
	},
	{
		path: ":lang",
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "admin",
				element: <Admin />,
				children: [
					{
						path: "news",
						element: <AdminNews />,
						children: [
							{
								path:"",
								element: <NewsListAdm/>
							},
							{
								path:":id?",
								element: <NewsPiece/>
							},
							{
								path: "create/:id?",
								element: <NewsCreate />,
							},{
								path: "topicarea",
								element: <TopicAreaForm/>
							},
						],
					},
					{
						path: "opensourcesolutions",
						element: <OpenSourceSolutionAdm />,
						children: [
							{
								path: "create",
								element: <OpensourceSolutionCreatePopup />,
							},
						],
					},
					{
						path: "projects",
						element: <ProjectsAdm />,
						children: [
							{
								path: "create",
								element: <ProjectCreate />,
							},
						],
					},
					{
						path: "statistics",
						element: <Statistics />,
					},
					{
						path: "technology",
						element: <TechnologiesAdm />,
						children: [
							{
								path: "create",
								element: <TechnologyCreate />,
							},
						],
					},
					{
						path: "users",
						element: <Users />,
						children: [
							{
								path: "create",
								element: <UserCreate />,
							},
						],
					},
					{
						path: "login",
						element: <Login />,
					},
				],
			},
			{
				path: "",
				element: <Public />,
				children: [
					{
						path: "contact",
						element: <Contact />,
					},
					{
						path: "",
						element: <Home />,
					},
					{
						path: "news",
						element: <News />,
						children: [
							{
								path:"",
								element: <NewsList/>
							},
							{
								path: ":id",
								element: <NewsPiece />,
							},
						],
					},
					{
						path: "opensourcesolutions",
						element: <OpenSourceSolutions />,
						children: [
							{
								path: ":id",
								element: <OpenSourceSolution />,
							},
						],
					},
					{
						path: "projects",
						element: <Projects />,
						children: [
							{
								path: ":id",
								element: <Project />,
							},
						],
					},
					{
						path: "technology",
						element: <Technologies />,
						children: [
							{
								path: ":id",
								element: <Technology />,
							},
						],
					},
				],
			},
		],
	},
], {});