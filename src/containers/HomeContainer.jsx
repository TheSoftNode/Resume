import React from "react";
import { Filters } from "../components";

const HomeContainer = () => {
  return (
    <div className="w-full px-4 lg:px-12 py-6 flex flex-col 
      items-center justify-start"
    >
      {/* Filter section */}
      <Filters />

      {/* Render  the templates - Resume Pin */}
    </div>
  );
};

export default HomeContainer;
