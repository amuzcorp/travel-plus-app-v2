import Button from "@enact/sandstone/Button";
import { Cell, Column } from "@enact/ui/Layout";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const MyLuggagePage = React.memo(() => {
  const navigate = useNavigate();

  const onClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <Column>
      <Cell>
        <Button onClick={onClick}>Go Back</Button>
      </Cell>
    </Column>
  );
});

export default MyLuggagePage;
