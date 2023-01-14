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
            { type: "hashtag", name: "berlin", numer_of_urls: 118 },
            { type: "hashtag", name: "cdu", numer_of_urls: 112 },
            { type: "hashtag", name: "klimakrise", numer_of_urls: 130 },
          ],
          type: "topic",
        },
        {
          name: "french",
          entries: [
            { type: "hashtag", name: "retraites", numer_of_urls: 70 },
            { type: "hashtag", name: "vendredilecture", numer_of_urls: 53 },
          ],
          type: "topic",
        },
        {
          name: "spanish",
          entries: [{ type: "hashtag", name: "musica", numer_of_urls: 84 }],
          type: "topic",
        },
      ],
    },
    {
      name: "art",
      entries: [
        { type: "hashtag", name: "birds", numer_of_urls: 162 },
        { type: "hashtag", name: "drawing", numer_of_urls: 119 },
        { type: "hashtag", name: "poetry", numer_of_urls: 329 },
        { type: "hashtag", name: "photography", numer_of_urls: 1278 },
        { type: "hashtag", name: "mastoart", numer_of_urls: 551 },
      ],
      type: "topic",
    },
    {
      name: "community",
      entries: [
        { type: "hashtag", name: "blackmastodon", numer_of_urls: 173 },
        { type: "hashtag", name: "furry", numer_of_urls: 170 },
        { type: "hashtag", name: "lgbtq", numer_of_urls: 114 },
        { type: "hashtag", name: "queer", numer_of_urls: 49 },
        { type: "hashtag", name: "parenting", numer_of_urls: 46 },
      ],
      type: "topic",
    },
    {
      name: "food",
      entries: [
        { type: "hashtag", name: "cooking", numer_of_urls: 69 },
        { type: "hashtag", name: "vegetarian", numer_of_urls: 12 },
        { type: "hashtag", name: "beer", numer_of_urls: 65 },
        { type: "hashtag", name: "wine", numer_of_urls: 40 },
        { type: "hashtag", name: "vegan", numer_of_urls: 115 },
      ],
      type: "topic",
    },
    {
      name: "games",
      entries: [
        { type: "hashtag", name: "wordle", numer_of_urls: 233 },
        { type: "hashtag", name: "hashtaggames", numer_of_urls: 116 },
        { type: "hashtag", name: "videogames", numer_of_urls: 195 },
        { type: "hashtag", name: "retrogames", numer_of_urls: 18 },
      ],
      type: "topic",
    },
    {
      name: "politics",
      entries: [
        { type: "hashtag", name: "biden", numer_of_urls: 89 },
        { type: "hashtag", name: "trump", numer_of_urls: 148 },
        { type: "hashtag", name: "politics", numer_of_urls: 390 },
      ],
      type: "topic",
    },
    {
      name: "software",
      entries: [
        { type: "hashtag", name: "javascript", numer_of_urls: 62 },
        { type: "hashtag", name: "css", numer_of_urls: 35 },
        { type: "hashtag", name: "python", numer_of_urls: 132 },
        { type: "hashtag", name: "rust", numer_of_urls: 40 },
        { type: "hashtag", name: "ml", numer_of_urls: 12 },
        { type: "hashtag", name: "accessibility", numer_of_urls: 47 },
      ],
      type: "topic",
    },
    {
      name: "science",
      entries: [
        { type: "hashtag", name: "physics", numer_of_urls: 39 },
        { type: "hashtag", name: "history", numer_of_urls: 315 },
        { type: "hashtag", name: "climatechange", numer_of_urls: 260 },
        { type: "hashtag", name: "openaccess", numer_of_urls: 41 },
        { type: "hashtag", name: "dataviz", numer_of_urls: 17 },
      ],
      type: "topic",
    },
    {
      name: "sport",
      entries: [
        { type: "hashtag", name: "arsenal", numer_of_urls: 21 },
        { type: "hashtag", name: "football", numer_of_urls: 108 },
        { type: "hashtag", name: "baseball", numer_of_urls: 63 },
        { type: "hashtag", name: "nfl", numer_of_urls: 58 },
      ],
      type: "topic",
    },
    {
      name: "other",
      entries: [
        { type: "hashtag", name: "hashtaggames", numer_of_urls: 116 },
        { type: "hashtag", name: "ttrpg", numer_of_urls: 487 },
      ],
      type: "topic",
    },
    {
      name: "questionable",
      icon: <Report />,
      entries: [
        { type: "hashtag", name: "nsfw", numer_of_urls: 699 },
        { type: "hashtag", name: "nude", numer_of_urls: 280 },
        { type: "hashtag", name: "twitter", numer_of_urls: 554 },
        { type: "hashtag", name: "hentai", numer_of_urls: 172 },
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
