import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import InstanceSelector from "./src/InstanceSelector";

const App = () => {
  const [data, setData] = useState();
  useEffect(() => {
    fetch("/fii-data.json")
      .then((x) => x.json())
      .then(setData);
  }, []);

  if (!data) {
    return <>Welcome</>;
  }

  return (
    <>
      <InstanceSelector data={data}></InstanceSelector>{" "}
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
