import React, { useEffect, useReducer, useRef, useState } from "react";
import HashtagChoice from "./HashtagChoice";
import DisplayInstances from "./DisplayInstances";
import Introduction from "./Introduction";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import TopicChoice from "./TopicChoice";
import DisplayInstancesForTopic from "./DisplayInstancesForTopic";
import InstancesForTopic from "./instances/InstancesForTopic";

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

  const topicData = [
    {
      name: "art",
      entries: [
        { hashtag: "birds" },
        { hashtag: "moon" },
        { hashtag: "poetry" },
        { hashtag: "photography" },
        { hashtag: "mastoart" },
      ],
    },
    {
      name: "climate",
      entries: [{ hashtag: "cop28" }, { hashtag: "climatechange" }],
    },
    {
      name: "community",
      entries: [
        { hashtag: "blackmastodon" },
        { hashtag: "furry" },
        { hashtag: "lgbtq" },
        { hashtag: "queer" },
        { hashtag: "latinx" },
      ],
    },
    {
      name: "food",
      entries: [
        { hashtag: "cooking" },
        { hashtag: "vegetarian" },
        { hashtag: "beer" },
        { hashtag: "wine" },
        { hashtag: "vegan" },
      ],
    },
    {
      name: "games",
      entries: [
        { hashtag: "wordle" },
        { hashtag: "hashtaggames" },
        { hashtag: "videogames" },
        { hashtag: "retrogames" },
      ],
    },
    {
      name: "german",
      entries: [
        { hashtag: "autobahn" },
        { hashtag: "cdu" },
        { hashtag: "deutschpflicht" },
      ],
    },
    {
      name: "french",
      entries: [{ hashtag: "retraites" }, { hashtag: "vendredilecture" }],
    },
    { name: "spanish", entries: [{ hashtag: "musica" }] },
    {
      name: "us politics",
      entries: [
        { hashtag: "biden" },
        { hashtag: "mccarthy" },
        { hashtag: "trump" },
      ],
    },
    {
      name: "software",
      entries: [
        { hashtag: "javascript" },
        { hashtag: "css" },
        { hashtag: "python" },
        { hashtag: "rust" },
        { hashtag: "ml" },
        { hashtag: "accessibility" },
      ],
    },
    {
      name: "science",
      entries: [
        { hashtag: "physics" },
        { hashtag: "history" },
        { hashtag: "climatechange" },
        { hashtag: "openaccess" },
        { hashtag: "dataviz" },
      ],
    },
    {
      name: "sport",
      entries: [
        { hashtag: "arsenal" },
        { hashtag: "football" },
        { hashtag: "baseball" },
        { hashtag: "nfl" },
      ],
    },
    {
      name: "other",
      entries: [{ hashtag: "hashtaggames" }, { hashtag: "ttrpg" }],
    },
    {
      name: "questionable",
      notcheckable: true,
      entries: [
        { hashtag: "nsfw" },
        { hashtag: "nude" },
        { hashtag: "twitter" },
      ],
    },
  ];

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
