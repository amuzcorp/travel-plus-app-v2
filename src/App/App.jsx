import ThemeDecorator from "@enact/sandstone/ThemeDecorator";
import { Cell, Row } from "@enact/ui/Layout";
import { Outlet } from "react-router-dom";
import GlobalNavigationBar from "../components/GlobalNavigationBar/GlobalNavigationBar";

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
    <Row>
      <GlobalNavigationBar />
      <Cell
        style={{
          marginLeft: "130px",
        }}
      >
        <Outlet />
      </Cell>
    </Row>
  );
};

export default ThemeDecorator(App);
