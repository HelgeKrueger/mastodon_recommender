import {
  Button,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import HashtagsFromAccount from "./HashtagsFromAccount";

const HashtagChoice = ({ hashtags, chosen, setChosen, onNext }) => {
  //   const [chosen, setChosen] = useState([]);

  const topics = [
    "animal",
    "art",
    "dailies",
    "location",
    "sport",
    "science",
    "society",
    "meta",
    "tech",
    "politics",
    "other",
  ];

  const [hashtagsByTopic, setHashtagsByTopic] = useState({});

  useEffect(() => {
    const locationHashtags = [
      "europe",
      "india",
      "losangeles",
      "pakistan",
      "us",
      "indonesia",
      "brasilien",
      "brasile",
      "vancouver",
      "russia",
      "brazil",
      "florida",
      "brasilia",
      "boston",
      "england",
      "brazilian",
      "europa",
      "georgia",
      "eu",
      "santacruz",
      "balkany",
      "usa",
      "virginia",
      "london",
      "canada",
      "brasil",
      "france",
      "seattle",
      "newyork",
      "bresil",
    ];

    const sportHashtags = [
      "blaseball",
      "nflplayoffs",
      "playoffs",
      "packers",
      "seahawks",
      "detvsgb",
      "football",

      "nfl",
      "cyclocross",
    ];

    const dailiesHashtags = [
      "vendredilecture",
      "fotomontag",
      "mondaymood",
      "friday",
      "montag",
      "retromontag",
      "righttorepair",
      "blackfriday",

      "windowfriday",
      "fossilfriday",
      "fungifriday",
      "retromonday",
      "lunes",

      "bandcampfriday",
      "followbackfriday",
      "standingstonesunday",
      "cybermentoringmonday",
      "screenshotsaturday",
      "meemumonday",
      "fotomonday",
      "goodmorning",
      "mondog",

      "mondaymotivation",
      "jukeboxfridaynight",
      "photomonday",
      "happymonday",
      "monochromemonday",
      "caturday",

      "saturday",
      "fensterfreitag",
      "windowfriday",
      "followfriday",
      "silentsunday",
      "viernesdeescritorio",
      "januaryjoy",
      "felizlunes",
      "monday",
      "ploughmonday",
      "musicmonday",
      "friday",
      "sunday",
      "dailyhaikuprompt",
    ];

    const scienceHashtags = [
      "virginorbit",
      "academic",
      "phd",
      "ecology",
      "biodiversity",
      "sustainability",

      "preprint",
      "academicmastodon",
      "horizoneu",
      "earthquake",
      "tech",
      "histodon",
      "vaccines",

      "quantum",

      "agriculture",
      "forschung",

      "sciencemastodon",
      "klimawandel",

      "medmastodon",
      "climatechange",
      "satellite",
      "academia",
      "longcovid",
      "openscience",
      "genomics",
      "education",
      "opendata",
      "plasma",
      "adhd",

      "teaching",

      "astrophotography",
      "medtwitter",
      "urbanplanning",
      "openaccess",
      "wissenschaft",
    ];

    const techHashtags = [
      "cybersec",
      "accessibility",
      "ransomware",
      "kde",
      "nlproc",
      "malware",
      "cloud",
      "yarn",
      "ux",
      "lastpass",
      "microsoft",
      "blender",

      "metatext",
      "nerd",

      "amazon",
      "seo",
      "meta",

      "matrix",
      "security",
      "datenschutz",
      "discord",
      "web",

      "rstats",
      "videogames",
      "pentesting",
      "freesoftware",

      "threema",
      "johnmastodon",
      "devops",
      "streaming",
      "fedora",
      "php",
      "hacking",
      "retrogaming",
      "pixelart",
      "javascript",
      "rust",
      "commodore64",
      "iphone",
      "ff",
      "opensource",
      "linux",
      "internet",
      "twitch",
      "patreon",
      "frontend",
      "android",
      "wordpress",
      "lenovo",
      "ruby",
      "google",
      "foss",
      "apple",
      "gamedev",
      "github",
      "steam",
      "dotnet",
      "steamdeck",
      "raspberrypi",
      "editor",
      "playstation",
      "rustlang",
      "gaming",
      "socialmedia",
      "technology",
      "nintendoswitch",
      "gnome",
      "facebook",
      "ipad",
    ];

    const politicsHashtags = [
      "standwithukraine",
      "bolsonaro",
      "scotus",
      "verkehrswende",
      "kubicki",

      "eu4roma",
      "brexit",
      "infrastructure",
      "energy",

      "january6",
      "democracy",
      "qatargate",
      "atomkraft",

      "unions",
      "antifa",
      "politiikka",
      "mobilitatsgipfel",

      "commissionsopen",

      "eutraineeship",
      "j6",
      "bannon",
      "disinformation",
      "iranrevolution",
      "biden",
      "euco",
      "csu",

      "democratie",
      "iranprotests",
      "inflation",
      "supremecourt",
      "elon",
      "elonmusk",
      "jan6",
      "insurrectionists",
      "tory",
      "digitaldecade",
      "coup",
      "immigration",
      "lula",
      "activism",
      "corruption",
      "digitaleu",
      "johndeere",
      "misinformation",
      "eugreendeal",
    ];

    const artHashtags = [
      "singing",
      "booktodon",
      "genuary8",
      "artmatters",
      "crimefiction",

      "urbanfantasy",
      "genuary9",

      "rock",
      "nonfiction",

      "podcast",
      "buyartnotcandy",
      "mastoart",
      "homedecor",
      "classicalmusic",
      "ayearforart",
      "embroidery",
      "tatort",
      "furryart",
      "eurovision",
      "buyintoart",
      "andor",
      "photographer",

      "nudes",
      "cinema",
      "amwriting",
      "dyslexia",
      "museums",
      "comic",
      "artistsonmastodon",
      "bwphotography",
      "creative",
      "flowerphotography",
      "horror",
      "watercolour",
      "cassette",
      "guitar",
      "artists",

      "owncast",
      "fotografie",
      "author",
      "haiku",

      "podcasts",
      "monochrome",
      "meme",
      "book",

      "simonedebeauvoir",
      "sketch",
      "webcomics",
      "podcasting",

      "davidbowie",
      "libraries",

      "modernart",
      "mythology",

      "mastomusic",
      "amediting",

      "librarian",
      "reading",
      "tootradio",
      "fediart",
      "media",
      "streetphotography",
      "culture",
      "digitalart",
      "speculativefiction",
      "fantasy",
      "satire",
      "webcomic",
      "hiphop",
      "memoir",
      "journalism",
      "closeup",
      "9gennaio",
      "artdeco",
      "mosstodon",
    ];

    const metaHashtags = [
      "introduccion",
      "fediverse",
      "twitterexodus",
      "community",
      "hashtaggames",
      "fediblock",
      "neuhier",
      "intro",

      "introductions",
    ];

    const societyHashtags = [
      "furry",
      "lgbtq",
      "lesbian",
      "blackjoy",
      "woman",
      "queer",
      "unionofequality",
      "onepride",

      "feminism",
      "lgbtqia",
    ];

    const animalHashtags = [
      "dog",
      "dogsofmastodon",
      "mastocat",
      "mastocats",
      "lions",
      "pet",
      "dogs",
      "spider",
      "insects",
      "cat",
    ];

    let filtered = {
      animal: hashtags.filter((x) => animalHashtags.indexOf(x) > -1),
      art: hashtags.filter((x) => artHashtags.indexOf(x) > -1),
      location: hashtags.filter((x) => locationHashtags.indexOf(x) > -1),
      sport: hashtags.filter((x) => sportHashtags.indexOf(x) > -1),
      dailies: hashtags.filter((x) => dailiesHashtags.indexOf(x) > -1),
      meta: hashtags.filter((x) => metaHashtags.indexOf(x) > -1),
      science: hashtags.filter((x) => scienceHashtags.indexOf(x) > -1),
      tech: hashtags.filter((x) => techHashtags.indexOf(x) > -1),
      society: hashtags.filter((x) => societyHashtags.indexOf(x) > -1),
      politics: hashtags.filter((x) => politicsHashtags.indexOf(x) > -1),
    };

    const collected = Object.values(filtered).reduce((a, b) => a.concat(b));

    filtered.other = hashtags.filter((x) => collected.indexOf(x) === -1);

    console.log(filtered);

    setHashtagsByTopic(filtered);
  }, [hashtags]);

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
      {topics.map((topic) => {
        return (
          <Paper
            elevation={2}
            key={topic}
            sx={{ margin: 4, padding: 4, backgroundColor: "#fcf" }}
          >
            <Typography variant="h6">{topic}</Typography>
            <ToggleButtonGroup
              color="primary"
              value={chosen}
              onChange={handleChange}
              sx={{ display: "block" }}
              size="small"
            >
              {hashtagsByTopic[topic]?.map((tag) => (
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
          </Paper>
        );
      })}
      {/* 
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
      </ToggleButtonGroup> */}
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
