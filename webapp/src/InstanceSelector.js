import React, { useEffect, useReducer, useRef, useState } from "react";
import HashtagChoice from "./HashtagChoice";
import DisplayInstances from "./DisplayInstances";
import Introduction from "./Introduction";
import { Box, Container, Paper, Typography } from "@mui/material";
import TopicChoice from "./TopicChoice";
import DisplayInstancesForTopic from "./DisplayInstancesForTopic";

const topicsReducer = (state, action) => {
  const [topic, value] = action;

  state[topic] = value;

  return { ...state };
};

const InstanceSelector = ({ data, information }) => {
  const [topics, topicsDispatch] = useReducer(topicsReducer, {});

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
      <Paper
        sx={{
          width: "80%",
          backgroundColor: "white",
          margin: 2,
          padding: 2,
          textAlign: "center",
        }}
        elevation={4}
      >
        <Typography variant="h2">Instance Recommender</Typography>
        Alpha version; For information contact @helgek@mas.to.
      </Paper>
      <Box sx={{ display: "flex", padding: 3 }}>
        <TopicChoice topics={topics} dispatch={topicsDispatch} />
        <DisplayInstancesForTopic
          information={information}
          data={data}
          topics={topics}
        />
      </Box>
    </>
  );

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
        <DisplayInstances
          data={data}
          hashtags={chosen}
          information={information}
        />
      </div>
    </>
  );
};

export default InstanceSelector;
