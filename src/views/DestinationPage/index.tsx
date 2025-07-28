import React, { useMemo } from "react";
import styled from "styled-components";

import Header from "../../components/Headers/Header";
import { translate } from "../../utils/translate";

const DestinationPage = React.memo(() => {
  const stepList = useMemo(
    () => [
      translate("destinations.continent"),
      translate("destinations.country"),
      translate("destinations.city"),
    ],
    []
  );
  return (
    <DestinationWrapper>
      <Header
        title={translate("navigation.destinations")}
        subtitle={translate("destinations.pickDestination")}
        stepList={stepList}
        activeStepIndex={0}
      />
    </DestinationWrapper>
  );
});

export default DestinationPage;

const DestinationWrapper = styled.div``;
