import React from "react";
import { createHashRouter, replace, RouterProvider } from "react-router-dom";

import App from "../../App/App";
import DestinationPage from "../../views/DestinationPage";
import HomePage from "../../views/HomePage";
import MyLuggagePage from "../../views/MyLuggagePage";
import SearchPage from "../../views/SearchPage";
import SettingsPage from "../../views/SettingsPage";
import SplashPage from "../../views/SplashPage";
import TestPage from "../../views/TestPage";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        loader: () => {
          const visitedKey = "hasVisited";
          const checkValue = "you visited";

          const visited = localStorage.getItem(visitedKey);
          if (visited === checkValue) {
            return replace("home");
          }

          localStorage.setItem(visitedKey, checkValue);
          return replace("splash");
        },
      },
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
