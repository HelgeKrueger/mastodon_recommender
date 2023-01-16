import React from "react";
import { Language, Report } from "@mui/icons-material";

const rawData = [
  {
    name: "art",
    entries: [
      {
        type: "hashtag",
        name: "birds",
        retrieved_on: "2023-01-14",
        number_of_urls: 162,
        number_of_domains: 60,
      },
      {
        type: "hashtag",
        name: "drawing",
        retrieved_on: "2023-01-14",
        number_of_urls: 119,
        number_of_domains: 49,
      },
      {
        type: "hashtag",
        name: "poetry",
        retrieved_on: "2023-01-14",
        number_of_urls: 329,
        number_of_domains: 69,
      },
      {
        type: "hashtag",
        name: "photography",
        retrieved_on: "2023-01-14",
        number_of_urls: 1278,
        number_of_domains: 212,
      },
      {
        type: "hashtag",
        name: "mastoart",
        retrieved_on: "2023-01-14",
        number_of_urls: 551,
        number_of_domains: 101,
      },
    ],
    type: "topic",
  },
  {
    name: "community",
    entries: [
      {
        type: "hashtag",
        name: "blackmastodon",
        retrieved_on: "2023-01-14",
        number_of_urls: 173,
        number_of_domains: 40,
      },
      {
        type: "hashtag",
        name: "furry",
        retrieved_on: "2023-01-14",
        number_of_urls: 170,
        number_of_domains: 56,
      },
      {
        type: "hashtag",
        name: "lgbtq",
        retrieved_on: "2023-01-14",
        number_of_urls: 114,
        number_of_domains: 44,
      },
      {
        type: "hashtag",
        name: "queer",
        retrieved_on: "2023-01-14",
        number_of_urls: 49,
        number_of_domains: 33,
      },
      {
        type: "hashtag",
        name: "parenting",
        retrieved_on: "2023-01-14",
        number_of_urls: 46,
        number_of_domains: 30,
      },
    ],
    type: "topic",
  },
  {
    name: "food",
    entries: [
      {
        type: "hashtag",
        name: "cooking",
        retrieved_on: "2023-01-14",
        number_of_urls: 69,
        number_of_domains: 35,
      },
      {
        type: "hashtag",
        name: "vegetarian",
        retrieved_on: "2023-01-14",
        number_of_urls: 12,
        number_of_domains: 8,
      },
      {
        type: "hashtag",
        name: "beer",
        retrieved_on: "2023-01-14",
        number_of_urls: 65,
        number_of_domains: 31,
      },
      {
        type: "hashtag",
        name: "wine",
        retrieved_on: "2023-01-14",
        number_of_urls: 40,
        number_of_domains: 21,
      },
      {
        type: "hashtag",
        name: "vegan",
        retrieved_on: "2023-01-14",
        number_of_urls: 115,
        number_of_domains: 48,
      },
    ],
    type: "topic",
  },
  {
    name: "games",
    entries: [
      {
        type: "hashtag",
        name: "wordle",
        retrieved_on: "2023-01-14",
        number_of_urls: 233,
        number_of_domains: 82,
      },
      {
        type: "hashtag",
        name: "hashtaggames",
        retrieved_on: "2023-01-14",
        number_of_urls: 116,
        number_of_domains: 28,
      },
      {
        type: "hashtag",
        name: "videogames",
        retrieved_on: "2023-01-14",
        number_of_urls: 195,
        number_of_domains: 60,
      },
      {
        type: "hashtag",
        name: "retrogames",
        retrieved_on: "2023-01-14",
        number_of_urls: 18,
        number_of_domains: 11,
      },
    ],
    type: "topic",
  },
  {
    name: "german",
    entries: [
      {
        type: "hashtag",
        name: "berlin",
        retrieved_on: "2023-01-14",
        number_of_urls: 118,
        number_of_domains: 50,
      },
      {
        type: "hashtag",
        name: "cdu",
        retrieved_on: "2023-01-14",
        number_of_urls: 112,
        number_of_domains: 32,
      },
      {
        type: "hashtag",
        name: "klimakrise",
        retrieved_on: "2023-01-14",
        number_of_urls: 130,
        number_of_domains: 46,
      },
      {
        type: "hashtag",
        name: "tatort",
        retrieved_on: "2023-01-16",
        number_of_urls: 299,
        number_of_domains: 45,
      },
    ],
    type: "topic",
  },
  {
    name: "french",
    entries: [
      {
        type: "hashtag",
        name: "retraites",
        retrieved_on: "2023-01-14",
        number_of_urls: 70,
        number_of_domains: 23,
      },
      {
        type: "hashtag",
        name: "vendredilecture",
        retrieved_on: "2023-01-14",
        number_of_urls: 53,
        number_of_domains: 24,
      },
    ],
    type: "topic",
  },
  {
    name: "spanish",
    entries: [
      {
        type: "hashtag",
        name: "musica",
        retrieved_on: "2023-01-14",
        number_of_urls: 84,
        number_of_domains: 22,
      },
    ],
    type: "topic",
  },
  {
    name: "politics",
    entries: [
      {
        type: "hashtag",
        name: "biden",
        retrieved_on: "2023-01-14",
        number_of_urls: 89,
        number_of_domains: 32,
      },
      {
        type: "hashtag",
        name: "trump",
        retrieved_on: "2023-01-14",
        number_of_urls: 148,
        number_of_domains: 47,
      },
      {
        type: "hashtag",
        name: "politics",
        retrieved_on: "2023-01-14",
        number_of_urls: 390,
        number_of_domains: 80,
      },
    ],
    type: "topic",
  },
  {
    name: "software",
    entries: [
      {
        type: "hashtag",
        name: "javascript",
        retrieved_on: "2023-01-14",
        number_of_urls: 62,
        number_of_domains: 34,
      },
      {
        type: "hashtag",
        name: "css",
        retrieved_on: "2023-01-14",
        number_of_urls: 35,
        number_of_domains: 18,
      },
      {
        type: "hashtag",
        name: "python",
        retrieved_on: "2023-01-14",
        number_of_urls: 132,
        number_of_domains: 62,
      },
      {
        type: "hashtag",
        name: "rust",
        retrieved_on: "2023-01-14",
        number_of_urls: 40,
        number_of_domains: 22,
      },
      {
        type: "hashtag",
        name: "ml",
        retrieved_on: "2023-01-14",
        number_of_urls: 12,
        number_of_domains: 8,
      },
      {
        type: "hashtag",
        name: "accessibility",
        retrieved_on: "2023-01-14",
        number_of_urls: 47,
        number_of_domains: 35,
      },
    ],
    type: "topic",
  },
  {
    name: "science",
    entries: [
      {
        type: "hashtag",
        name: "physics",
        retrieved_on: "2023-01-14",
        number_of_urls: 39,
        number_of_domains: 26,
      },
      {
        type: "hashtag",
        name: "history",
        retrieved_on: "2023-01-14",
        number_of_urls: 315,
        number_of_domains: 74,
      },
      {
        type: "hashtag",
        name: "climatechange",
        retrieved_on: "2023-01-14",
        number_of_urls: 260,
        number_of_domains: 82,
      },
      {
        type: "hashtag",
        name: "openaccess",
        retrieved_on: "2023-01-14",
        number_of_urls: 41,
        number_of_domains: 17,
      },
      {
        type: "hashtag",
        name: "dataviz",
        retrieved_on: "2023-01-14",
        number_of_urls: 17,
        number_of_domains: 10,
      },
    ],
    type: "topic",
  },
  {
    name: "sport",
    entries: [
      {
        type: "hashtag",
        name: "arsenal",
        retrieved_on: "2023-01-14",
        number_of_urls: 21,
        number_of_domains: 6,
      },
      {
        type: "hashtag",
        name: "football",
        retrieved_on: "2023-01-14",
        number_of_urls: 108,
        number_of_domains: 34,
      },
      {
        type: "hashtag",
        name: "baseball",
        retrieved_on: "2023-01-14",
        number_of_urls: 63,
        number_of_domains: 15,
      },
      {
        type: "hashtag",
        name: "nfl",
        retrieved_on: "2023-01-14",
        number_of_urls: 58,
        number_of_domains: 24,
      },
    ],
    type: "topic",
  },
  {
    name: "other",
    entries: [
      {
        type: "hashtag",
        name: "hashtaggames",
        retrieved_on: "2023-01-14",
        number_of_urls: 116,
        number_of_domains: 28,
      },
      {
        type: "hashtag",
        name: "ttrpg",
        retrieved_on: "2023-01-14",
        number_of_urls: 487,
        number_of_domains: 89,
      },
    ],
    type: "topic",
  },
  {
    name: "questionable",
    entries: [
      {
        type: "hashtag",
        name: "nsfw",
        retrieved_on: "2023-01-14",
        number_of_urls: 699,
        number_of_domains: 70,
      },
      {
        type: "hashtag",
        name: "nude",
        retrieved_on: "2023-01-14",
        number_of_urls: 280,
        number_of_domains: 27,
      },
      {
        type: "hashtag",
        name: "twitter",
        retrieved_on: "2023-01-14",
        number_of_urls: 554,
        number_of_domains: 183,
      },
      {
        type: "hashtag",
        name: "hentai",
        retrieved_on: "2023-01-14",
        number_of_urls: 172,
        number_of_domains: 12,
      },
    ],
    type: "topic",
  },
];

const getTopicData = () => {
  let result = rawData.filter(
    (x) =>
      ["german", "french", "spanish", "questionable"].indexOf(x.name) === -1
  );

  let languages = [
    {
      type: "group",
      name: "other languages",
      icon: <Language />,
      entries: rawData.filter(
        (x) => ["german", "french", "spanish"].indexOf(x.name) > -1
      ),
    },
  ];

  result = languages.concat(result);

  let questionable = rawData.find((x) => x.name === "questionable");
  questionable.type = "group";
  questionable.icon = <Report />;

  result.push(questionable);

  return result;
};

export default getTopicData;
