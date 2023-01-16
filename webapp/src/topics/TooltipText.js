import React from "react";

const TooltipText = ({ entry }) => {
  return (
    <>
      Information from <b>{entry.number_of_urls} status posts</b>
      <br />
      made from {entry.number_of_domains} different instances.
      <br />
      Retrieved on {entry.retrieved_on}.
    </>
  );
};

export default TooltipText;
