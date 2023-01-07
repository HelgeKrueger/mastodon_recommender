import { Box, Grid, Link, Paper } from "@mui/material";
import React from "react";
import Chart from "./Chart";

const InstanceInformation = ({ name, data }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        {" "}
        <Link href={`https://${name}/`} target="_blank">
          {name}
        </Link>
        <br />
        <Link href={`https://${name}/public/local`} target="_blank">
          Local Timeline
        </Link>
        <br />
        <Link href={`https://${name}/public`} target="_blank">
          Federated Timeline
        </Link>
      </Grid>
      <Grid item xs={10}>
        <Chart data={data} />
      </Grid>
    </Grid>
  );
};

export default InstanceInformation;
