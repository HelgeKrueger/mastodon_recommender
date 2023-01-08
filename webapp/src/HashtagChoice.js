import {
  Button,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React from "react";
import HashtagsFromAccount from "./HashtagsFromAccount";

const HashtagChoice = ({ hashtags, chosen, setChosen, onNext }) => {
  //   const [chosen, setChosen] = useState([]);

  hashtags = hashtags.sort();

  const handleChange = (event, value) => {
    setChosen(value);
  };

  return (
    <Paper elevation={5} sx={{ backgroundColor: "white", padding: 2 }}>
      <HashtagsFromAccount
        hashtags={hashtags}
        setChosen={setChosen}
        onNext={onNext}
      />
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
        Choose Hashtags you like
      </Typography>
      <ToggleButtonGroup
        color="primary"
        value={chosen}
        onChange={handleChange}
        sx={{ display: "block" }}
        size="small"
      >
        {hashtags.map((tag) => (
          <ToggleButton
            key={tag}
            value={tag}
            sx={{ width: "250px", margin: 1, padding: 0 }}
            size="small"
          >
            {tag}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <Button
        variant="contained"
        onClick={onNext}
        disabled={!chosen.length}
        fullWidth
      >
        Next
      </Button>
    </Paper>
  );
};

export default HashtagChoice;
