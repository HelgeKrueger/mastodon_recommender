const hasActiveEntries = (entry, topics) => {
  if (entry.type === "hashtag") {
    return topics.indexOf(entry.name) > -1;
  }
  return entry.entries.some((x) => hasActiveEntries(x, topics));
};
const determineValue = (entry, data) => {
  if (entry.type === "hashtag") {
    return data?.[entry.name];
  }
  return (
    entry.entries
      .map((x) => determineValue(x, data))
      .reduce((acc, x) => acc + x, 0) / entry.entries.length
  );
};
const createDisplayData = (data, topics, topicData) => {
  let toDisplay = {};

  for (let entry of topicData) {
    if (hasActiveEntries(entry, topics)) {
      for (let item of entry.entries) {
        if (item.type === "hashtag") {
          toDisplay["#" + item.name] = data[item.name];
        } else {
          const tmp = createDisplayData(data, topics, [item]);
          toDisplay = { ...toDisplay, ...tmp };
        }
      }
    } else {
      toDisplay[entry.name] = determineValue(entry, data);
    }
  }

  return toDisplay;
};

export { createDisplayData };
