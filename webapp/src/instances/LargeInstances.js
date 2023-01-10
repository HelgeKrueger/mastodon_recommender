import { Paper, Typography } from "@mui/material";
import React from "react";
import SingleInstance from "./SingleInstance";

const LargeInstances = ({ information }) => {
  const instances = [
    "mastodon.social",
    "mstdn.social",
    "mastodon.world",
    "mas.to",
    "pawoo.net",
    "mastodon.online",
  ];
  return (
    <Paper elevation={5} sx={{ padding: 2, margin: 2, width: "60%" }}>
      <Typography variant="h5">Large instances</Typography>
      <Typography>
        Instances with more than 20'000 active accounts at the time of writing.
        These instances are a safe choice, if one wants lots of content, but
        cover practically all topics. They are the most Twitter like parts of
        the Fediverse.
      </Typography>
      {instances.map((instance) => (
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

export default LargeInstances;
