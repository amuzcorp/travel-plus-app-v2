import React from "react";
import { createHashRouter, replace, RouterProvider } from "react-router-dom";

import App from "../../App/App";
import AppLayout from "../../views/AppLayout";
import DestinationPage from "../../views/DestinationPage";
import HomePage from "../../views/HomePage";
import MyLuggagePage from "../../views/MyLuggagePage";
import NetworkErrorPage from "../../views/NetworkErrorPage";
import SearchPage from "../../views/SearchPage";
import SettingsPage from "../../views/SettingsPage";
import SplashPage from "../../views/SplashPage";
import TestPage from "../../views/TestPage";
import { localStorageVisited } from "../constants/globalConstant";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        loader: () => {
          const visited = localStorage.getItem(localStorageVisited.key);
          if (visited === localStorageVisited.value) {
            return replace("home");
          }

          localStorage.setItem(localStorageVisited.key, localStorageVisited.value);
          return replace("splash");
        },
      },
      {
        path: "/",
        element: <AppLayout />,
        children: [
          {
            path: "home",
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
        path: "splash",
        element: <SplashPage />,
      },
      {
        path: "network-error",
        element: <NetworkErrorPage />,
      },
      {
        path: "test",
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
