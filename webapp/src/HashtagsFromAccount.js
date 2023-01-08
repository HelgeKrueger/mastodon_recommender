import { Button, Container, Paper, TextField } from "@mui/material";
import React, { useState } from "react";

const HashtagsFromAccount = ({ hashtags, setChosen, onNext }) => {
  const [account, setAccount] = useState("");
  const [disabled, setDisabled] = useState(false);

  const fetchAccount = () => {
    const domain = account.split("@")[1];
    setDisabled(true);
    fetch(`https://${domain}/api/v2/search?q=${account}`)
      .then((x) => x.json())
      .then((data) => {
        const acct = data.accounts[0];
        const acct_id = acct.id;

        fetch(`https://${domain}/api/v1/accounts/${acct_id}/statuses?limit=40`)
          .then((x) => x.json())
          .then((statuses) => {
            const tags = statuses.map((x) => x?.tags);
            const tagNames = tags
              .reduce((a, b) => a.concat(b))
              .map((x) => x.name.toLowerCase());

            setChosen(tagNames.filter((tag) => hashtags.indexOf(tag) > -1));
            setDisabled(false);
            // onNext();
          });
      });
  };

  return (
    <Paper
      elevation={10}
      sx={{ margin: 3, padding: 3, backgroundColor: "#ccffff" }}
    >
      Enter accountname to fetch hashtag from first 40 elements on timeline.
      <TextField
        value={account}
        onChange={(ev) => setAccount(ev.target.value)}
        label="Account name username@domain"
        disabled={disabled}
      />
      <Button onClick={fetchAccount} disabled={disabled} variant="contained">
        Fetch
      </Button>
    </Paper>
  );
};

export default HashtagsFromAccount;
