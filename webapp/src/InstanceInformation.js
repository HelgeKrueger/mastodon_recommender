import { Alert, Divider, Grid, Link } from "@mui/material";
import React from "react";
import Chart from "./Chart";

const Registration = ({ data }) => {
  console.log(data);

  if (!data?.enabled) {
    return <Alert severity="error">Registration not possible</Alert>;
  }
  if (data?.approval_required) {
    return <Alert severity="warning">Registration requires approval</Alert>;
  }

  return <></>;
};

const InstanceInformation = ({ name, data, information }) => {
  const info = information?.[name];
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Link href={`https://${name}/`} target="_blank">
          {name}
        </Link>
        <br />
        {info?.description}
        <Registration data={info?.registration} />
        <Divider sx={{ margin: 2 }} />
        <Link href={`https://${name}/about`} target="_blank">
          About
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
      <Grid item xs={8}>
        <Chart data={data} />
      </Grid>
    </Grid>
  );
};

export default InstanceInformation;
