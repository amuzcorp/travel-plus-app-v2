import { createHashRouter, RouterProvider } from "react-router-dom";

import App from "../../App/App.jsx";
import HomePage from "../../views/HomePage/index.jsx";
import TestPage from "../../views/TestPage/index.jsx";

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

const Router = () => {
  return (
    <RouterProvider
      router={router}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    />
  );
};

export default Router;
