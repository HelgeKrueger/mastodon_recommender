import {
  Button,
  CardContent,
  Grid,
  IconButton,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import Chart from "../Chart";
import Registration from "./Registration";

import * as d3 from "d3";
import { Info } from "@mui/icons-material";

const SingleInstance = ({ name, info, includeLinks, data, rawData }) => {
  const values = Object.values(rawData || {});

  const mean = d3.mean(values);
  const std = d3.deviation(values);

  return (
    <>
      <Paper elevation={4} sx={{ margin: 2, padding: 2 }}>
        <Grid container>
          <Grid item xs={8}>
            <Link href={`https://${name}/`} target="_blank">
              <Typography variant="h3">{name}</Typography>
            </Link>
          </Grid>
          <Grid item xs={4}>
            <b>Federation Statistics</b>
            <br />
            <Grid container>
              <Grid item xs={6}>
                Score: {Number(mean).toFixed(0)}
                <br />
                Focus: {Number(std).toFixed(0)}
              </Grid>
              <Grid item xs={6}>
                {/* <Button>
                  <Info />
                </Button> */}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ padding: 2 }}>
            <Registration data={info?.registration} />
            {info?.description}
          </Grid>
        </Grid>
      </Paper>
      <Chart data={data} />
    </>
  );
};

export default SingleInstance;
