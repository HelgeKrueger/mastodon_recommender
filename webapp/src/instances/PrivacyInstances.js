import { Paper, Typography } from "@mui/material";
import React from "react";
import SingleInstance from "./SingleInstance";

const PrivacyInstances = ({ information }) => {
  const instances = ["eldritch.cafe", "octodon.social"];

  return (
    <Paper elevation={5} sx={{ padding: 2, margin: 2, width: "60%" }}>
      <Typography variant="h5">Instances with better privacy</Typography>
      <Typography>
        These instances have better privacy, because they lock down data enough
        that tools such as this one, cannot easily collect it. Basically, you
        should not have an API endpoint handing out statuses to be part of this
        list.
      </Typography>
      {instances.map((instance) => (
        <SingleInstance
          name={instance}
          info={information?.[instance]}
          key={instance}
        />
      ))}
    </Paper>
  );
};

export default PrivacyInstances;
