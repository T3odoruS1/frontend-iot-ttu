import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import App from './App';
import ErrorPage from './routes/ErrorPage';
import Root from './routes/Root';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NewsDemoPage from './routes/News/NewsDemoPage';

const router = createBrowserRouter([
  {
    path:"/",
    element:<Root />,
    errorElement:<ErrorPage />,
    children: [
      {
        path:"newsDemo/", 
        element: <NewsDemoPage/>
      }
    ]

  }
]
)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
		<RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
