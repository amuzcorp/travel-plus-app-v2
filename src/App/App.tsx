import Panels from "@enact/sandstone/Panels";
import ThemeDecorator from "@enact/sandstone/ThemeDecorator";

import TestPage from "../views/TestPage";
import HomePage from "../views/HomePage/index.jsx";

// import { Outlet } from "react-router-dom";

// const App = kind({
//   name: "App",

//   styles: {
//     css,
//     className: "app",
//   },

//   render: (props) => (
//     <Panels {...props}>
//       <Outlet />
//     </Panels>
//   ),
// });

const App = () => {
  return (
    <Panels>
      <HomePage />
      <TestPage />
    </Panels>
  );
};

export default ThemeDecorator(App);
