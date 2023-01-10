import React from "react";
import { Alert } from "@mui/material";

const Registration = ({ data }) => {
  if (!data?.enabled) {
    return <Alert severity="error">Registration not possible</Alert>;
  }
  if (data?.approval_required) {
    return <Alert severity="warning">Registration requires approval</Alert>;
  }

  return <></>;
};

export default Registration;
