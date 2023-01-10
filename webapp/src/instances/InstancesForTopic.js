import { Paper, Typography } from "@mui/material";
import React from "react";
import SingleInstance from "./SingleInstance";

const scoreInstance = (values, hashtags) => {
  const sum =
    Object.values(values).reduce((acc, x) => acc + x, 0) /
    Object.values(values).length;
  if (sum === 0) {
    return -10000;
  }
  return hashtags.reduce((acc, tag) => acc + values[tag] - sum, 0);
};

const InstancesForTopic = ({ data, topics, information }) => {
  let hashtags = [];
  const instances = Object.keys(data);

  if (topics.length === 0) {
    return <></>;
  }

  if (topics.indexOf("deutsch") > -1) {
    hashtags.push("verkehrswende");
    hashtags.push("csu");
    hashtags.push("mobilitatsgipfel");
  }

  if (topics.indexOf("ussports") > -1) {
    hashtags = hashtags.concat([
      "baseball",
      "seahawks",
      "nflplayoffs",
      "packers",
    ]);
  }
  if (topics.indexOf("uspolitics") > -1) {
    hashtags = hashtags.concat(["scotus", "jan6"]);
  }
  if (topics.indexOf("science") > -1) {
    hashtags = hashtags.concat([
      "openscience",
      "sciencemastodon",
      "genomics",
      "academic",
    ]);
  }
  if (topics.indexOf("eupolitics") > -1) {
    hashtags = hashtags.concat(["tory", "brexit", "euco", "standwithukraine"]);
  }
  if (topics.indexOf("world") > -1) {
    hashtags = hashtags.concat(["brasil", "france", "indonesia", "pakistan"]);
  }

  if (topics.indexOf("spanish") > -1) {
    hashtags = hashtags.concat(["felizlunes"]);
  }
  if (topics.indexOf("tech") > -1) {
    hashtags = hashtags.concat(["lenovo", "linux", "javascript"]);
  }
  if (topics.indexOf("french") > -1) {
    hashtags = hashtags.concat(["vendredilecture"]);
  }

  if (topics.indexOf("photos") > -1) {
    hashtags = hashtags.concat([
      "dogsofmastodon",
      "standingstonesunday",
      "flowerphotography",
    ]);
  }

  let sorted = instances;
  sorted.sort(
    (a, b) =>
      scoreInstance(data[b], hashtags) - scoreInstance(data[a], hashtags)
  );

  sorted = sorted.slice(0, 10);

  return (
    <Paper elevation={5} sx={{ padding: 2, margin: 2, width: "60%" }}>
      <Typography variant="h5">Topic: {topics.join(", ")}</Typography>
      <Typography>
        Selection based on hashtags: {hashtags.join(", ")}
      </Typography>
      {sorted.map((instance) => (
        <SingleInstance
          name={instance}
          info={information?.[instance]}
          key={instance}
          includeLinks
        />
      ))}
    </Paper>
  );
};

export default InstancesForTopic;
