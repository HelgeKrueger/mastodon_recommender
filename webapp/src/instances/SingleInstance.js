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
import Registration from "./Registration";

const SingleInstance = ({ name, info, includeLinks }) => {
  let furtherInformation = "";
  if (includeLinks) {
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
    <Card elevation={2} sx={{ margin: 2, padding: 1, backgroundColor: "#ffd" }}>
      <CardContent>
        <Link href={`https://${name}/`} target="_blank">
          <Typography variant="h6">{name}</Typography>
        </Link>
        <br />
        {info?.description}
        <Registration data={info?.registration} />
      </CardContent>
      {furtherInformation}
    </Card>
  );
};

export default SingleInstance;
