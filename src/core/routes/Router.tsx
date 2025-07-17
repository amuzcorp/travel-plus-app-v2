import { createHashRouter, RouterProvider } from "react-router-dom";

import App from "../../App/App";
import HomePage from "../../views/HomePage/index.jsx";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        element: <HomePage />,
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
