import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";

import App from "../../App/App";
import HomePage from "../../views/HomePage";
import TestPage from "../../views/TestPage";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/test",
        element: <TestPage />,
      },
    ],
  },
]);

const Router: React.FC = () => {
  return (
    <RouterProvider
      router={router}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    />
  );
};

export default Router;