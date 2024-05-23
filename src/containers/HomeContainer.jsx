import React from "react";
import { Filters, MainSpinner, TemplateDesignPin } from "../components";
import useTemplates from "../hooks/useTemplates";
import { AnimatePresence } from "framer-motion";

const HomeContainer = () => {
  const {
    data: templates,
    isError: temp_isError,
    isLoading: temp_isLoading,
    refetch: temp_refetch,
  } = useTemplates();

  if (temp_isLoading) {
    return <MainSpinner />;
  }

  return (
    <div
      className="w-full px-4 lg:px-12 py-6 flex flex-col 
      items-center justify-start"
    >
      {/* Filter section */}
      <Filters />

      {/* Render  the templates - Resume Pin */}
      {temp_isError ? (
        <>
          <p className="text-lg text-txtDark">
            Something went wrong...Please try again later
          </p>
        </>
      ) : (
        <>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2">
            <RenderTemplate templates={templates} />
          </div>
        </>
      )}
    </div>
  );
};

const RenderTemplate = ({ templates }) => {
  return (
    <>
      {templates && templates.length > 0 ? (
        <>
          <AnimatePresence>
            {templates &&
              templates.map((template, index) => (
                <TemplateDesignPin
                  key={template?._id}
                  data={template}
                  index={index}
                />
              ))}
          </AnimatePresence>
        </>
      ) : (
        <>
          <p>No Data found</p>
        </>
      )}
    </>
  );
};

export default HomeContainer;
