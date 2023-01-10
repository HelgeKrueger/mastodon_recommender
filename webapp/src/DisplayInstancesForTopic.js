import React from "react";
import PrivacyInstances from "./instances/PrivacyInstances";
import LargeInstances from "./instances/LargeInstances";
import InstancesForTopic from "./instances/InstancesForTopic";

const DisplayInstancesForTopic = ({ data, information, topics }) => {
  if (topics.privacy) {
    return <PrivacyInstances information={information} />;
  }

  if (topics.large) {
    return <LargeInstances information={information} />;
  }

  let topicList = Object.keys(topics).filter((t) => topics[t]);

  return (
    <InstancesForTopic
      topics={topicList}
      data={data}
      information={information}
    />
  );
};

export default DisplayInstancesForTopic;
