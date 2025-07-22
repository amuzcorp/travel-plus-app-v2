import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";

import App from "../../App/App";
import HomePage from "../../views/HomePage";
import TestPage from "../../views/TestPage";
import SearchPage from "../../views/SearchPage";
import DestinationPage from "../../views/DestinationPage";
import MyLuggagePage from "../../views/MyLuggagePage";
import SettingsPage from "../../views/SettingsPage";

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
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "destination",
        element: <DestinationPage />,
      },
      {
        path: "my-luggage",
        element: <MyLuggagePage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
  {
    path: "/test",
    element: <TestPage />,
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
