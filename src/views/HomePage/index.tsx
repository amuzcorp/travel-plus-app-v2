import Button, { ButtonProps } from "@enact/sandstone/Button";
import { Panel } from "@enact/sandstone/Panels";

const HomePage = () => {
  const buttonProps: ButtonProps = {
    icon: "subtitle",
  };

  return (
    <Panel>
      <Button {...buttonProps} />
    </Panel>
  );
};

export default HomePage;
