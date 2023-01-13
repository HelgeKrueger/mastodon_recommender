import { ExpandLess, ExpandMore, Info } from "@mui/icons-material";
import { List, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import TopicEntry from "./topics/TopicEntry";

const TopicChoice = ({ selected, dispatch, topicData }) => {
  return (
    <Paper elevation={5} sx={{ padding: 1, margin: 1 }}>
      <Typography variant="h5">Select Topics</Typography>
      <List dense>
        {topicData.map((entry) => (
          <TopicEntry
            data={entry}
            key={entry.name}
            selected={selected}
            dispatch={dispatch}
          />
        ))}
      </List>
    </Paper>
  );
};

export default TopicChoice;
