import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "../Routes/Home";
import MainPage from "../Routes/MainPage";

const App = () => {
  const [url, setUrl] = React.useState("http://localhost:9000/");
  const [fileTree, setFileTree] = React.useState([]);
  const [pageState, setPageState] = React.useState("Home");

  return pageState === "Home" ? (
    <Home
      setUrl={setUrl}
      setFileTree={setFileTree}
      url={url}
      setPageState={setPageState}
    />
  ) : (
    <MainPage fileTree={fileTree} url={url} setPageState={setPageState} />
  );
};

export default App;
