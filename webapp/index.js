import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import InstanceSelector from "./src/InstanceSelector";

const App = () => {
  const [data, setData] = useState();
  const [information, setInformation] = useState();
  useEffect(() => {
    fetch("/fii-data.json")
      .then((x) => x.json())
      .then(setData);
    fetch("/instance-information.json")
      .then((x) => x.json())
      .then(setInformation);
  }, []);

  if (!data || !information) {
    return <>Welcome</>;
  }

  return <InstanceSelector data={data} information={information} />;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
