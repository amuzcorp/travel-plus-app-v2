import React from "react";

import CarouselRow from "./components/CarouselRow";

const HomePage: React.FC = React.memo(() => {
  return (
    <div style={{ paddingLeft: "130px" }}>
      <CarouselRow />
    </div>
  );
});

export default HomePage;
