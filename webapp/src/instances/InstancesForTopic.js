import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { createDisplayData } from "../compute/displayData";
import SingleInstance from "./SingleInstance";

const scoreInstance = (values, hashtags) => {
  const sum =
    Object.values(values).reduce((acc, x) => acc + x, 0) /
    Object.values(values).length;
  if (sum === 0) {
    return -10000;
  }
  return hashtags.reduce((acc, tag) => acc + values[tag] - sum, 0) + sum / 10;
};

const InstancesForTopic = ({ data, topics, information, topicData }) => {
  const [displayed, setDisplayed] = useState();
  const [dataToDisplay, setDataToDisplay] = useState({});
  const instances = Object.keys(data);

  let sorted = instances;
  sorted.sort(
    (a, b) => scoreInstance(data[b], topics) - scoreInstance(data[a], topics)
  );

  sorted = sorted.slice(0, 20);

  useEffect(() => {
    setDisplayed(sorted[0]);
  }, [topics]);

  useEffect(() => {
    setDataToDisplay(createDisplayData(data[displayed], topics, topicData));
  }, [displayed]);

  return (
    <Grid container>
      <Grid item xs={3}>
        <Paper elevation={5} sx={{ padding: 1, margin: 1 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Name</b>
                </TableCell>
                {/* {topics.map((name) => (
                  <TableCell
                    sx={{
                      // transformOrigin: "60px 100px",
                      // transform: "rotate(-90deg)",
                      width: "30px",
                    }}
                    key={name}
                  >
                    <div
                      style={{
                        transformOrigin: "20px 30px",
                        transform: "rotate(-90deg)",
                        width: "30px",
                      }}
                    >
                      {name}
                    </div>
                  </TableCell>
                ))} */}
              </TableRow>
            </TableHead>
            <TableBody>
              {sorted.map((instance) => (
                <TableRow
                  key={instance}
                  onClick={() => {
                    setDisplayed(instance);
                  }}
                  sx={{
                    backgroundColor:
                      displayed === instance ? "lightblue" : "white",
                  }}
                >
                  <TableCell>{instance}</TableCell>
                  {/* {topics.map((name) => {
                    return (
                      <TableCell key={name}>
                        {Number(data[instance][name]).toFixed(0)}
                      </TableCell>
                    );
                  })} */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <Paper elevation={3} sx={{ padding: 1, margin: 1 }}>
          <SingleInstance
            name={displayed}
            info={information?.[displayed]}
            key={displayed}
            data={dataToDisplay}
            rawData={data?.[displayed]}
            includeLinks
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default InstancesForTopic;
