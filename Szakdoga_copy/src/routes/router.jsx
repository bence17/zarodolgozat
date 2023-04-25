import Root from "./root";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Kezdolap from "./kezdolap";
import Kezeles from "./kezeles";
import ErrorPage from "./errorPage";
import { Login } from "../components/Login";
import { Register } from "../components/Register";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          errorElement: <ErrorPage />,
          children: [
            {
              index: true,
              element: <Login />,
            },
            {
              path: "/kezdolap",
              element: <Kezdolap />,
            },
            {
              path: "/kezeles",
              element: <Kezeles />,
            },
            {
              path: "/login",
              element: <Login />,
            },
            {
              path: "/register",
              element: <Register />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
