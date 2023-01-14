import { createDisplayData } from "./displayData";

test("createDisplayData - simple topic", () => {
  const data = {
    tag1: 50,
  };

  const topicData = [
    {
      name: "topic1",
      type: "topic",
      entries: [{ name: "tag1", type: "hashtag" }],
    },
  ];

  let result;

  result = createDisplayData(data, [], topicData);
  expect(result.topic1).toBe(50);

  result = createDisplayData(data, ["tag1"], topicData);
  expect(result["#tag1"]).toBe(50);
});

test("createDisplayData - simple group", () => {
  const data = {
    tag1: 50,
  };

  const topicData = [
    {
      name: "group1",
      type: "group",
      entries: [{ name: "tag1", type: "hashtag" }],
    },
  ];

  let result;

  result = createDisplayData(data, [], topicData);
  expect(result.group1).toBe(50);

  result = createDisplayData(data, ["tag1"], topicData);
  expect(result["#tag1"]).toBe(50);
});

test("createDisplayData - topic nested in group", () => {
  const data = {
    tag1: 50,
  };

  const topicData = [
    {
      name: "group1",
      type: "group",
      entries: [
        {
          name: "topic1",
          type: "topic",
          entries: [{ name: "tag1", type: "hashtag" }],
        },
      ],
    },
  ];

  let result;

  result = createDisplayData(data, [], topicData);
  expect(result.group1).toBe(50);

  result = createDisplayData(data, ["tag1"], topicData);
  expect(result["#tag1"]).toBe(50);
});
