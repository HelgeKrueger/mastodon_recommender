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

  const itemsPerRow = 200;

  hashtags = hashtags.sort();

  const handleChange = (event, value) => {
    setChosen(value);
  };

  return (
    <Box sx={{ backgroundColor: "white" }}>
      <Typography variant="h4">Choose Hashtags you like</Typography>

      <ToggleButtonGroup
        color="primary"
        value={chosen}
        onChange={handleChange}
        sx={{ display: "block" }}
      >
        {hashtags.map((tag) => (
          <ToggleButton key={tag} value={tag}>
            {tag}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};

export default HashtagChoice;
