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
import HashtagEntry from "./HashtagEntry";

const TopicEntry = ({ data, selected, dispatch }) => {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [inderminate, setInderminate] = useState(false);
  const entries = data.entries;

  useEffect(() => {
    if (selected) {
      const value = data.entries.every((entry) => selected?.[entry.hashtag]);

      if (!value) {
        if (data.entries.some((entry) => selected?.[entry.hashtag])) {
          setInderminate(true);
        } else {
          setInderminate(false);
        }
      }

      if (value) {
        setInderminate(false);
      }

      setChecked(value ? true : false);
    }
  }, [selected]);

  const handleClick = () => {
    dispatch({
      action: "setTopic",
      values: data.entries.map((entry) => entry.hashtag),
      selected: !checked,
    });
  };

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
        <ListItemButton dense onClick={handleClick}>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={checked}
              tabIndex={-1}
              disableRipple
              disabled={data?.notcheckable}
              indeterminate={inderminate}
            />
          </ListItemIcon>
          <ListItemText primary={data.name} />
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit sx={{ padding: 1 }}>
        <List component="div" disablePadding>
          {entries.map((entry) => (
            <HashtagEntry
              key={entry.hashtag}
              entry={entry}
              selected={selected?.[entry.hashtag]}
              dispatch={dispatch}
            />
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default TopicEntry;
