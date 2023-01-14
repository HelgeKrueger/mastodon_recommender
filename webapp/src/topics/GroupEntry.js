import { ExpandLess, ExpandMore, Info } from "@mui/icons-material";
import {
  Checkbox,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Entry from "./Entry";
import HashtagEntry from "./HashtagEntry";

const GroupEntry = ({ data, selected, dispatch }) => {
  const [open, setOpen] = useState(false);
  const entries = data.entries;

  return (
    <>
      <ListItem
        disablePadding
        secondaryAction={
          <>
            <IconButton
              onClick={(e) => {
                setOpen(!open);
                e.preventDefault();
              }}
            >
              {open ? <ExpandMore /> : <ExpandLess />}
            </IconButton>
          </>
        }
      >
        <ListItemButton dense>
          <ListItemIcon>{data?.icon}</ListItemIcon>
          <ListItemText primary={data.name} />
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit sx={{ padding: 1 }}>
        <List component="div" disablePadding>
          {entries.map((entry) => (
            <Entry
              key={entry.name}
              data={entry}
              selected={selected}
              dispatch={dispatch}
            />
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default GroupEntry;
