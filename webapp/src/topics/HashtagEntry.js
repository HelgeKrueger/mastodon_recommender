import { Info } from "@mui/icons-material";
import {
  Checkbox,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import React from "react";

const TooltipText = ({ entry }) => {
  return (
    <>
      Information from <b>{entry.number_of_urls} status posts</b>
      <br />
      made from {entry.number_of_domains} different instances
    </>
  );
};

const HashtagEntry = ({ entry, selected, dispatch }) => {
  return (
    <ListItem
      secondaryAction={<></>}
      sx={{ paddingTop: 0, paddingBottom: 0 }}
      onClick={(e) => {
        dispatch({
          action: "setvalue",
          hashtag: entry.name,
          selected: !selected,
        });
      }}
    >
      <ListItemButton>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={selected ? true : false}
            tabIndex={-1}
            sx={{ padding: 0 }}
          />
        </ListItemIcon>
        <ListItemText primary={"#" + entry.name} />
        <Tooltip title={<TooltipText entry={entry} />}>
          <Info />
        </Tooltip>
      </ListItemButton>
    </ListItem>
  );
};

export default HashtagEntry;
