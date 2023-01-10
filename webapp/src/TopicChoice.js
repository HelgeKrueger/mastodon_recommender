import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";

const TopicChoice = ({ topics, dispatch }) => {
  const labels = [
    ["deutsch", "Deutsch"],
    ["spanish", "Español"],
    ["french", "Français"],
    ["science", "Science"],
    ["photos", "Photos"],
    ["tech", "Technology"],
    // ["eupolitics", "EU Politics"],
    // ["world", "World"],
    // ["ussports", "US Sports"],
    ["uspolitics", "US Politics"],
  ];

  return (
    <Paper elevation={5} sx={{ padding: 2, margin: 2 }}>
      <Typography variant="h5">Select Topics</Typography>
      <FormGroup>
        {labels.map((entry) => (
          <FormControlLabel
            key={entry[0]}
            control={
              <Checkbox
                value={topics[entry[0]]}
                onChange={(e) => dispatch([entry[0], e.target.checked])}
              />
            }
            label={entry[1]}
          />
        ))}

        <Typography variant="h6">Meta</Typography>
        <FormControlLabel
          control={
            <Checkbox
              value={topics["privacy"]}
              onChange={(e) => dispatch(["privacy", e.target.checked])}
            />
          }
          label="Privacy: Expose less data to the internet"
        />
        <FormControlLabel
          control={
            <Checkbox
              value={topics["large"]}
              onChange={(e) => dispatch(["large", e.target.checked])}
            />
          }
          label="Large instances"
        />
      </FormGroup>
    </Paper>
  );
};

export default TopicChoice;
