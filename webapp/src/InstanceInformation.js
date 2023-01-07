import { Box, Grid, Link } from "@mui/material";
import React from "react";
import Chart from "./Chart";

const InstanceInformation = ({ name, data }) => {
  return (
    <Box>
      <Grid container>
        <Grid item xs={4}>
          <Link href={`https://${name}/`} target="_blank">
            {name}
          </Link>
        </Grid>
        <Grid item xs={4}>
          <Link href={`https://${name}/public/local`} target="_blank">
            Local Timeline
          </Link>
        </Grid>
        <Grid item xs={4}>
          <Link href={`https://${name}/public`} target="_blank">
            Federated Timeline
          </Link>
        </Grid>
      </Grid>
      <Chart data={data} />
    </Box>
  );
};

export default InstanceInformation;
