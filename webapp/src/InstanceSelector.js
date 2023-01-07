import React, { useRef, useState } from "react";
import HashtagChoice from "./HashtagChoice";
import DisplayInstances from "./DisplayInstances";
import Introduction from "./Introduction";

const InstanceSelector = ({ data }) => {
  const [chosen, setChosen] = useState([]);
  const displayRef = useRef();
  const hashtagRef = useRef();

  const hashtags = Object.keys(data["mas.to"]);

  const onNext = () => {
    displayRef.current.scrollIntoView();
  };

  const gotoHashtag = () => {
    hashtagRef.current.scrollIntoView();
  };

  return (
    <>
      <Introduction onNext={gotoHashtag} />
      <div ref={hashtagRef} style={{ marginTop: "40px" }}>
        <HashtagChoice
          hashtags={hashtags}
          chosen={chosen}
          setChosen={setChosen}
          onNext={onNext}
        />
      </div>
      <div ref={displayRef} style={{ marginTop: "40px" }}>
        <DisplayInstances data={data} hashtags={chosen} />
      </div>
    </>
  );
};

export default InstanceSelector;
