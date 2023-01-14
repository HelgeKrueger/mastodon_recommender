import React from "react";
import GroupEntry from "./GroupEntry";
import HashtagEntry from "./HashtagEntry";
import TopicEntry from "./TopicEntry";

const Entry = ({ data, selected, dispatch }) => {
  if (data?.type === "topic") {
    return <TopicEntry data={data} selected={selected} dispatch={dispatch} />;
  }
  if (data?.type === "group") {
    return <GroupEntry data={data} selected={selected} dispatch={dispatch} />;
  }
  if (data?.type === "hashtag") {
    return (
      <HashtagEntry
        entry={data}
        selected={selected?.[data.name]}
        dispatch={dispatch}
      />
    );
  }

  return <></>;
};

export default Entry;
