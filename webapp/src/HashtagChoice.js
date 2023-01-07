import {
  Box,
  Container,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const HashtagItem = ({ tag }) => {
  return <ToggleButton>{tag}</ToggleButton>;
};

const HashtagChoice = ({ hashtags, chosen, setChosen }) => {
  //   const [chosen, setChosen] = useState([]);

  let hashtagGroups = [];

  const itemsPerRow = 200;

  for (let j = 0; j < hashtags.length / itemsPerRow; j++) {
    hashtagGroups.push(
      hashtags.slice(j * itemsPerRow, j * itemsPerRow + itemsPerRow)
    );
  }

  const handleChange = (event, value) => {
    setChosen(value);
  };

  return (
    <Box sx={{ backgroundColor: "white" }}>
      <Typography variant="h4">Choose Hashtags you like</Typography>
      {hashtagGroups.map((group, idx) => {
        return (
          <ToggleButtonGroup
            color="primary"
            key={idx}
            value={chosen}
            onChange={handleChange}
            sx={{ display: "block" }}
          >
            {group.map((tag) => (
              <ToggleButton key={tag} value={tag}>
                {tag}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        );
      })}
    </Box>
  );
};

export default HashtagChoice;
