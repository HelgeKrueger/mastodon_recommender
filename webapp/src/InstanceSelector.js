import React, { useEffect, useReducer, useRef, useState } from "react";
import HashtagChoice from "./HashtagChoice";

import { Grid, Paper, Typography } from "@mui/material";
import TopicChoice from "./TopicChoice";
import InstancesForTopic from "./instances/InstancesForTopic";
import { Language, Report } from "@mui/icons-material";

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
      type: "group",
      name: "other languages",
      icon: <Language />,
      entries: [
        {
          name: "german",
          entries: [
            { type: "hashtag", name: "autobahn" },
            { type: "hashtag", name: "cdu" },
            { type: "hashtag", name: "deutschpflicht" },
          ],
          type: "topic",
        },
        {
          name: "french",
          entries: [
            { type: "hashtag", name: "retraites" },
            { type: "hashtag", name: "vendredilecture" },
          ],
          type: "topic",
        },
        {
          name: "spanish",
          entries: [{ type: "hashtag", name: "musica" }],
          type: "topic",
        },
      ],
    },
    {
      name: "art",
      entries: [
        { type: "hashtag", name: "birds" },
        { type: "hashtag", name: "moon" },
        { type: "hashtag", name: "poetry" },
        { type: "hashtag", name: "photography" },
        { type: "hashtag", name: "mastoart" },
      ],
      type: "topic",
    },
    {
      name: "climate",
      entries: [
        { type: "hashtag", name: "cop28" },
        { type: "hashtag", name: "climatechange" },
      ],
      type: "topic",
    },
    {
      name: "community",
      entries: [
        { type: "hashtag", name: "blackmastodon" },
        { type: "hashtag", name: "furry" },
        { type: "hashtag", name: "lgbtq" },
        { type: "hashtag", name: "queer" },
        { type: "hashtag", name: "latinx" },
      ],
      type: "topic",
    },
    {
      name: "food",
      entries: [
        { type: "hashtag", name: "cooking" },
        { type: "hashtag", name: "vegetarian" },
        { type: "hashtag", name: "beer" },
        { type: "hashtag", name: "wine" },
        { type: "hashtag", name: "vegan" },
      ],
      type: "topic",
    },
    {
      name: "games",
      entries: [
        { type: "hashtag", name: "wordle" },
        { type: "hashtag", name: "hashtaggames" },
        { type: "hashtag", name: "videogames" },
        { type: "hashtag", name: "retrogames" },
      ],
      type: "topic",
    },

    {
      name: "us politics",
      entries: [
        { type: "hashtag", name: "biden" },
        { type: "hashtag", name: "mccarthy" },
        { type: "hashtag", name: "trump" },
      ],
      type: "topic",
    },
    {
      name: "software",
      entries: [
        { type: "hashtag", name: "javascript" },
        { type: "hashtag", name: "css" },
        { type: "hashtag", name: "python" },
        { type: "hashtag", name: "rust" },
        { type: "hashtag", name: "ml" },
        { type: "hashtag", name: "accessibility" },
      ],
      type: "topic",
    },
    {
      name: "science",
      entries: [
        { type: "hashtag", name: "physics" },
        { type: "hashtag", name: "history" },
        { type: "hashtag", name: "climatechange" },
        { type: "hashtag", name: "openaccess" },
        { type: "hashtag", name: "dataviz" },
      ],
      type: "topic",
    },
    {
      name: "sport",
      entries: [
        { type: "hashtag", name: "arsenal" },
        { type: "hashtag", name: "football" },
        { type: "hashtag", name: "baseball" },
        { type: "hashtag", name: "nfl" },
      ],
      type: "topic",
    },
    {
      name: "other",
      entries: [
        { type: "hashtag", name: "hashtaggames" },
        { type: "hashtag", name: "ttrpg" },
      ],
      type: "topic",
    },
    {
      name: "questionable",
      icon: <Report />,
      entries: [
        { type: "hashtag", name: "nsfw" },
        { type: "hashtag", name: "nude" },
        { type: "hashtag", name: "twitter" },
      ],
      type: "group",
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
