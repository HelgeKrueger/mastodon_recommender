import React, { useEffect, useReducer, useRef, useState } from "react";
import HashtagChoice from "./HashtagChoice";

import { Grid, Paper, Typography } from "@mui/material";
import TopicChoice from "./TopicChoice";
import InstancesForTopic from "./instances/InstancesForTopic";
import { Language, Report } from "@mui/icons-material";
import getTopicData from "./topicData";

const topicsReducer = (state, action) => {
  if (action.action === "setvalue") {
    state[action.hashtag] = action.selected;
  }

  if (action.action === "setTopic") {
    for (let value of action.values) {
      state[value] = action.selected;
      console.log(value);
    }
    console.log(state);
  }

  return { ...state };
};

const InstanceSelector = ({ data, information }) => {
  const [topics, topicsDispatch] = useReducer(topicsReducer, {});

  const topicData = getTopicData();

  return (
    <>
      <Grid container>
        <Grid item xs={3}>
          <TopicChoice
            selected={topics}
            dispatch={topicsDispatch}
            topicData={topicData}
          />
        </Grid>
        <Grid item xs={9}>
          <Paper
            sx={{
              backgroundColor: "white",
              margin: 1,
              padding: 1,
              textAlign: "center",
              width: "97%",
            }}
            elevation={4}
          >
            <Grid container>
              <Grid item xs={9} sx={{ textAlign: "center" }}>
                <Typography variant="h2">Instance Recommender</Typography>
              </Grid>
              <Grid item xs={3}>
                For information contact: @helgek@mas.to.
              </Grid>
            </Grid>
          </Paper>
          <InstancesForTopic
            topics={Object.keys(topics).filter((t) => topics[t])}
            data={data}
            information={information}
            topicData={topicData}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default InstanceSelector;
