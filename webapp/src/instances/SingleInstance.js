import {
  Card,
  CardActions,
  CardContent,
  Divider,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import Chart from "../Chart";
import Registration from "./Registration";

const SingleInstance = ({ name, info, includeLinks, data }) => {
  let furtherInformation = "";
  if (false) {
    furtherInformation = (
      <CardActions sx={{ backgroundColor: "lightgray" }}>
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
      </CardActions>
    );
  }
  return (
    <>
      <Link href={`https://${name}/`} target="_blank">
        <Typography variant="h6">{name}</Typography>
      </Link>
      <br />
      {info?.description}
      <Registration data={info?.registration} />
      <br />
      {furtherInformation}
      <Chart data={data} />
    </>
  );
};

export default SingleInstance;
