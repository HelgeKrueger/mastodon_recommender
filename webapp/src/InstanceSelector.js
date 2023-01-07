import React, { useState } from "react";
import HashtagChoice from "./HashtagChoice";
import DisplayInstances from "./DisplayInstances";

const InstanceSelector = ({ data }) => {
  const [chosen, setChosen] = useState([]);

  const hashtags = Object.keys(data["mas.to"]);

  return (
    <>
      <HashtagChoice
        hashtags={hashtags}
        chosen={chosen}
        setChosen={setChosen}
      />
      <DisplayInstances data={data} hashtags={chosen} />
    </>
  );
};

export default InstanceSelector;
