import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Link, Tab, Typography } from "@mui/material";
import React, { useState } from "react";
import InstanceInformation from "./InstanceInformation";

const scoreInstance = (values, hashtags) => {
  const sum =
    Object.values(values).reduce((acc, x) => acc + x, 0) /
    Object.values(values).length;
  if (sum === 0) {
    return -10000;
  }
  return hashtags.reduce((acc, tag) => acc + values[tag] - sum, 0);
};

const DisplayInstances = ({ data, hashtags }) => {
  const [choice, setChoice] = useState("0");
  const instances = Object.keys(data);

  let sorted = instances;
  sorted.sort(
    (a, b) =>
      scoreInstance(data[b], hashtags) - scoreInstance(data[a], hashtags)
  );

  if (hashtags.length === 0) {
    return <></>;
  }

  const slice = sorted.slice(0, 10);

  return (
    <Box sx={{ backgroundColor: "white" }}>
      <Typography variant="h4">Recommended Instances</Typography>
      <Box sx={{ display: "flex" }}>
        <TabContext value={choice}>
          <TabList
            orientation="vertical"
            onChange={(event, value) => {
              setChoice(value);
            }}
          >
            {slice.map((name, idx) => (
              <Tab label={name} value={"" + idx} key={name} />
            ))}
          </TabList>
          {slice.map((name, idx) => (
            <TabPanel value={"" + idx}>
              <InstanceInformation data={data[name]} name={name} />
            </TabPanel>
          ))}
        </TabContext>
      </Box>
    </Box>
  );
};

export default DisplayInstances;
