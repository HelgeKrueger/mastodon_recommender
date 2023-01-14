import {
  Checkbox,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";

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
      </ListItemButton>
    </ListItem>
  );
};

export default HashtagEntry;
